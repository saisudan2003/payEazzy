"use server"
import { hash } from "bcrypt";
import prisma from "@repo/db/client";
import { userSchema } from "../../constants/userSchema";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  number: string;
}) {
  const { name, number, email, password } = userSchema.parse(data);

  const dbuser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (dbuser) {
    throw new Error("User with this email already exists");
  }

  const dbuser2 = await prisma.user.findUnique({
    where: {
      number: number,
    },
  });

  if (dbuser2) {
    throw new Error("User with this phone number already exists");
  }

  const hashedpass = await hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      number: number,
      password: hashedpass,
    },
  });
  
  const newuserBalance = await prisma.balance.create({
    data: {
      userId: newUser.id,
      amount: 0,
      locked: 0
    }
  })

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      number: newUser.number,
    },
    message: "User created successfully",
  };
}
