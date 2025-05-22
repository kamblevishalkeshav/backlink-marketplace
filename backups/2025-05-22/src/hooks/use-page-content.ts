import { Page, PageSection } from '@/types/content'
import { useEffect, useState } from 'react'

interface UsePageContentProps {
  slug: string
  fallbackData?: Page | null
}

interface UsePageContentReturn {
  page: Page | null
  isLoading: boolean
  error: string | null
  mutate: () => Promise<void>
}

export function usePageContent({ slug, fallbackData }: UsePageContentProps): UsePageContentReturn {
  const [page, setPage] = useState<Page | null>(fallbackData || null)
  const [isLoading, setIsLoading] = useState<boolean>(!fallbackData)
  const [error, setError] = useState<string | null>(null)

  const fetchPage = async () => {
    if (!slug) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/content?slug=${slug}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch page content')
      }
      
      const data = await response.json()
      setPage(data)
    } catch (err) {
      console.error('Error fetching page content:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const mutate = async () => {
    await fetchPage()
  }

  useEffect(() => {
    if (!fallbackData) {
      fetchPage()
    }
  }, [slug, fallbackData])

  return {
    page, 
    isLoading,
    error,
    mutate
  }
}

// Hook for getting a section by type
export function usePageSection<T extends PageSection>(
  page: Page | null, 
  sectionType: T['type']
): T | null {
  if (!page || !page.sections) return null
  
  const section = page.sections.find(
    section => section.type === sectionType
  ) as T | undefined
  
  return section || null
}

// Hook for getting default/fallback content when database content is unavailable
export function useDefaultContent<T extends PageSection>(
  pageSection: T | null,
  defaultContent: T
): T {
  return pageSection || defaultContent
} 