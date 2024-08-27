import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  const slidesDirectory = path.join(process.cwd(), 'public/assets/slides');
  
  try {
    const files = await fs.readdir(slidesDirectory);
    const images = files.filter(file => file.endsWith('.webp')).map(file => `/assets/slides/${file}`);
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('读取幻灯片目录时出错:', error);
    return NextResponse.json([]);
  }
}