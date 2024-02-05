import { NextRequest, NextResponse } from 'next/server';
import pool from '../db';

export async function GET(req: NextRequest) {
  try {
      const connection = await pool.getConnection();
      const [users, fields] = await connection.query('SELECT * FROM mock_data');
      connection.release();
      return NextResponse.json(users, {status: 200,});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      
      const connection = await pool.getConnection();
      const [result] = await connection.query('INSERT INTO mock_data (first_name, last_name, email, phone_num) VALUES (?, ?, ?, ?)', [body.first_name, body.last_name, body.email, body.phone_num]);
      connection.release();
  
      return NextResponse.json({message: "user successfully created"}, {status: 201})
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try{
        const body = await req.json();

        const connection = await pool.getConnection();
        const [result] = await connection.query('UPDATE mock_data SET first_name = ?, last_name = ?, email = ?, phone_num = ? where id = ?', [body.first_name, body.last_name, body.email, body.phone_num, body.id]);
        connection.release();
        
        return NextResponse.json({message: "user successfully updated"}, {status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try{
        const body = await req.json();

        const connection = await pool.getConnection();
        const [result] = await connection.query('DELETE FROM mock_data WHERE id = ?', [body.id]);
        connection.release();
        
        return NextResponse.json({message: "user successfully deleted"}, {status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}