import { getCollection, type CollectionEntry } from 'astro:content';

export async function getSortedBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
    return (await getCollection('blog')).sort(
        (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
            b.data.post_date.valueOf() - a.data.post_date.valueOf()
    );
}

export async function getSortedPostsByTag(tag: string): Promise<CollectionEntry<'blog'>[]> {
    const allPosts = await getSortedBlogPosts();
    return allPosts.filter(post => post.data.tags.includes(tag));
}

export async function getAllTags() {
    const allPosts = await getSortedBlogPosts();
    const allTags: string[] = [];

    allPosts.forEach(post => {
        const tags = post.data.tags;
        tags.forEach((tag: string) => allTags.push(tag));
    });

    return allTags;
}
