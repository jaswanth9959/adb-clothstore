import bcrypt from "bcryptjs";

const customers = [
  {
    firstname: "admin",
    lastname: "user",
    email: "admin@gmail.com",
    ssn: "12345678",
    role: "admin",
    phone: "1234567890",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    firstname: "normal",
    lastname: "user",
    email: "user@gmail.com",
    ssn: "12345679",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    phone: "1234567890",
  },
  {
    firstname: "john",
    lastname: "doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    phone: "1234567890",
  },
];
export default customers;
