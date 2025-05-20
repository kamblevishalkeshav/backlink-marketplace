import prisma from '@/lib/prisma'
import { PageSection } from '@/types/content'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// GET all pages
export async function GET(request: NextRequest) {
  try {
    // Check for slug parameter to get a specific page
    const slug = request.nextUrl.searchParams.get('slug')
    
    if (slug) {
      // Get a specific page by slug with its sections
      const page = await prisma.page.findUnique({
        where: { slug },
        include: {
          sections: {
            orderBy: { order: 'asc' }
          }
        }
      })
      
      if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 })
      }
      
      return NextResponse.json(page)
    } else {
      // Get all pages without sections
      const pages = await prisma.page.findMany({
        orderBy: { updatedAt: 'desc' }
      })
      
      return NextResponse.json(pages)
    }
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create a new page
export async function POST(request: NextRequest) {
  try {
    const { title, slug, sections = [] } = await request.json()
    
    // Check if page with this slug already exists
    const existingPage = await prisma.page.findUnique({
      where: { slug }
    })
    
    if (existingPage) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 })
    }
    
    // Create the page and its sections in a transaction
    const page = await prisma.$transaction(async (prismaClient: PrismaClient) => {
      // Create the page
      const newPage = await prismaClient.page.create({
        data: {
          title,
          slug,
          isPublished: false
        }
      })
      
      // Create the sections
      if (sections.length > 0) {
        await Promise.all(
          sections.map((section: Partial<PageSection>, index: number) => 
            prismaClient.pageSection.create({
              data: {
                name: section.name || '',
                type: section.type || 'CUSTOM',
                order: index,
                content: section.content || {},
                pageId: newPage.id
              }
            })
          )
        )
      }
      
      // Return the page with sections
      return prismaClient.page.findUnique({
        where: { id: newPage.id },
        include: {
          sections: {
            orderBy: { order: 'asc' }
          }
        }
      })
    })
    
    return NextResponse.json(page)
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update a page
export async function PUT(request: NextRequest) {
  try {
    const { id, title, slug, isPublished, sections = [] } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 })
    }
    
    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { id },
      include: { sections: true }
    })
    
    if (!existingPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }
    
    // Check if new slug conflicts with another page
    if (slug !== existingPage.slug) {
      const slugExists = await prisma.page.findUnique({
        where: { slug }
      })
      
      if (slugExists) {
        return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 })
      }
    }
    
    // Update the page and its sections in a transaction
    const updatedPage = await prisma.$transaction(async (prismaClient: PrismaClient) => {
      // Update the page
      await prismaClient.page.update({
        where: { id },
        data: {
          title,
          slug,
          isPublished
        }
      })
      
      // Delete existing sections
      await prismaClient.pageSection.deleteMany({
        where: { pageId: id }
      })
      
      // Create new sections
      if (sections.length > 0) {
        await Promise.all(
          sections.map((section: Partial<PageSection>, index: number) => 
            prismaClient.pageSection.create({
              data: {
                name: section.name || '',
                type: section.type || 'CUSTOM',
                order: index,
                content: section.content || {},
                pageId: id
              }
            })
          )
        )
      }
      
      // Return the updated page with sections
      return prismaClient.page.findUnique({
        where: { id },
        include: {
          sections: {
            orderBy: { order: 'asc' }
          }
        }
      })
    })
    
    return NextResponse.json(updatedPage)
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE a page
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 })
    }
    
    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { id }
    })
    
    if (!existingPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }
    
    // Delete the page (cascade will delete sections)
    await prisma.page.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 