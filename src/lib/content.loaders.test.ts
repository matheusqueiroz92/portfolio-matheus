import { describe, expect, it } from 'vitest'

import {
  getAllPosts,
  getAllPostSlugs,
  getAllProjectSlugs,
  getAllProjects,
  getFeaturedProjects,
  getFlagshipProject,
  getPostBySlug,
  getProjectBySlug,
} from './content'

describe('content loaders', () => {
  it('loads projects from the content directory', async () => {
    const projects = await getAllProjects()

    expect(projects.length).toBeGreaterThan(0)
    expect(projects.every((project) => project.slug && project.title)).toBe(true)
  })

  it('loads featured and flagship projects', async () => {
    const featured = await getFeaturedProjects()
    const flagship = await getFlagshipProject()

    expect(featured.length).toBeGreaterThan(0)
    expect(flagship).not.toBeNull()
    expect(flagship?.slug).toBeTruthy()
  })

  it('loads a project by slug and lists slugs', async () => {
    const slugs = await getAllProjectSlugs()
    const firstSlug = slugs[0]

    expect(firstSlug).toBeTruthy()

    const project = await getProjectBySlug(firstSlug)
    expect(project?.slug).toBe(firstSlug)
    expect(await getProjectBySlug('slug-inexistente-xyz')).toBeNull()
  })

  it('loads blog posts and resolves post by slug', async () => {
    const posts = await getAllPosts()
    const slugs = await getAllPostSlugs()

    expect(posts.length).toBeGreaterThan(0)
    expect(slugs).toEqual(posts.map((post) => post.slug))

    const firstSlug = slugs[0]
    const post = await getPostBySlug(firstSlug)

    expect(post?.slug).toBe(firstSlug)
    expect(post?.readingTimeMinutes).toBeGreaterThanOrEqual(1)
    expect(await getPostBySlug('slug-inexistente-xyz')).toBeNull()
  })
})
