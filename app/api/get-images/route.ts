// app/api/get-images/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const slidesDirectory = path.join(process.cwd(), 'public/assets/slides');
  
  try {
    const files = fs.readdirSync(slidesDirectory);
    const images = files.filter(file => file.endsWith('.webp')).map(file => `/assets/slides/${file}`);
    
    return NextResponse.json(images); // 确保返回 JSON 格式
  } catch (error) {
    console.error('Error reading slides directory:', error);
    return NextResponse.json([]); // 处理错误并返回空数组
  }
}