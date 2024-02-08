import { NextRequest } from "next/server";
import pool from "../db";

const USERS_PER_PAGE = 20;

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const pageNum = params.get("currentPage");
    const connection = await pool.getConnection();

    const skipValue = USERS_PER_PAGE * (parseInt(pageNum as string) - 1);
    //get groups of 20 users
    const [users] = await connection.query(
      "SELECT * FROM mock_data LIMIT ? OFFSET ?",
      [USERS_PER_PAGE, skipValue]
    );
    //get total number of users in database for pagination calculation
    const [numUsers] = await connection.query(
      "select count(id) as numUsers from mock_data"
    );

    connection.release();
    return Response.json({ users, numUsers });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const connection = await pool.getConnection();
    const [result] = await connection.query('INSERT INTO mock_data (first_name, last_name, email, phone_num) VALUES (?, ?, ?, ?)', [body.first_name, body.last_name, body.email, body.phone_num]);
    connection.release();

    return Response.json({ message: "User successfully created" });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const connection = await pool.getConnection();
    const [result] = await connection.query('UPDATE mock_data SET first_name = ?, last_name = ?, email = ?, phone_num = ? WHERE id = ?', [body.first_name, body.last_name, body.email, body.phone_num, body.id]);
    connection.release();

    return Response.json({ message: "User successfully updated" });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM mock_data WHERE id = ?', [body.id]);
    connection.release();

    return Response.json({ message: "User successfully deleted" });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
