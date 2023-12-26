const request = require("supertest");
const app = require("../../../app");
const { STATUS_CODES } = require("http");

const mockValidPayload = {
  name: "joe man",
  number: "1234567888",
  email: "Joe@example.com",
  password: "good joe",
  confirmPassword: "good joe",
};

// less time - should use model class to create mockUserModel
const mockUserModel = {
  "something": "something",
};

jest.mock("../../../services/userService", () => ({
  userRecordExists: jest.fn(),
  createUser: jest.fn(),
}));
const UserService = require("../../../services/userService");

describe("Signup Controller", () => {
  beforeAll(() => {
    process.env.BASE_URL = "https://exmample.com";
  });
  afterAll(() => {
    delete process.env.BASE_URL;
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("422 - when payload has missing fields", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({ name: "hello world" });

    expect(response.status).toBe(422);
    expect(response.body).toEqual(
      {
        statusCode: 422,
        error: STATUS_CODES[422],
        message: "\"number\" is required",
      },
    );
  });

  it("422 - when number is invalid (length > 10)", async () => {
    const mockPayload = { ...mockValidPayload, 
      number: "123451234512345" }

    const response = await request(app)
      .post("/auth/signup")
      .send(mockPayload);

    expect(response.status).toBe(422);
    expect(response.body).toEqual({
      statusCode: 422,
      error: STATUS_CODES[422],
      message: "Number is invalid",
    });
  });

  it("422 - when confirm password doesn't match", async () => {
    const mockPayload = {
      ...mockValidPayload,
      confirmPassword: "randompassword",
    };

    const response = await request(app)
      .post("/auth/signup")
      .send(mockPayload);

    expect(response.status).toBe(422);
    expect(response.body).toEqual(
      {
        message: "confirmPassword should equal password",
        statusCode: 422,
        error: STATUS_CODES[422],
      },
    );
  });

  it("400 - when email already exists in db", async () => {
    jest.spyOn(UserService, "userRecordExists").mockImplementation(() => true);

    const response = await request(app)
      .post("/auth/signup")
      .send(mockValidPayload);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      {
        statusCode: 400,
        error: STATUS_CODES[400],
        message: "Phone number already registered with another user",
      },
    );
  });

  it("500 - when failed to create user", async () => {
    jest.spyOn(UserService, "userRecordExists").mockImplementation(() => false);
    jest.spyOn(UserService, "createUser").mockImplementation(() => null);

    const response = await request(app)
      .post("/auth/signup")
      .send(mockValidPayload);

    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      {
        statusCode: 500,
        error: STATUS_CODES[500],
        message: "Unexpected error while registering user",
      }
    );
  });

  it("Success 201", async () => {
    jest
      .spyOn(UserService, "userRecordExists")
      .mockImplementation(() => false);

    jest.spyOn(UserService, "createUser").mockImplementation(() => mockUserModel);

    const response = await request(app)
      .post("/auth/signup")
      .send(mockValidPayload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      statusCode:200,
      message: "User registered successfully!",
    });
  });
});