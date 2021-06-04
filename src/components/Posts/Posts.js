import styled from "styled-components";
import Post from "./Post/Post";

export default function Posts({ posts, renderPosts, setPosts }) {
    return (
        <PostsWrapper>
            {posts.map((post) => {
                const { originalPoster, linkProps, caption, likes, id } =
                    parsePost(post);
                return (
                    <Post
                        key={post.repostId ?? id}
                        postID={id}
                        renderPosts={renderPosts}
                        originalPoster={originalPoster}
                        caption={caption}
                        likes={likes}
                        linkProps={linkProps}
                        post={post}
                        posts={posts}
                        setPosts={setPosts}
                    />
                );
            })}
        </PostsWrapper>
    );
}

function parsePost(post) {
    const { user } = post;
    const originalPoster = {
        avatar: user.avatar,
        name: user.username,
        id: user.id,
    };
    const linkProps = {
        href: post.link,
        title: post.linkTitle,
        description: post.linkDescription,
        srcImage: post.linkImage,
    };
    const caption = post.text;
    const likes = post.likes;
    const id = post.id;
    return { originalPoster, linkProps, caption, likes, id };
}

const PostsWrapper = styled.ul`
    & > li + li {
        margin-top: 16px;
    }
`;
