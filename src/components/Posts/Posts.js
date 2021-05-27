import styled from 'styled-components';
import Post from './Post/Post';

export default function Posts({posts, setPosts}){
  return (
    <PostsWrapper>
      {posts.map(post=>{
        const {originalPoster, linkProps, caption, likes, id} = parsePost(post);
        return(
          <Post
            key={id}
            originalPoster={originalPoster}
            caption={caption}
            likes={likes}
            linkProps={linkProps}
            postid={id}
            setPosts={setPosts}
            post={post}
            posts={posts}
          />
        )
      })}
    </PostsWrapper>
  );
}

function parsePost(post){
  const {user} = post;
  const originalPoster = {
    avatar: user.avatar,
    name: user.username,
    id: user.id
  }
  const linkProps = {
    href: post.link,
    title: post.title,
    description: post.description,
    srcImage : post.linkImage
  }
  const caption = post.text;
  const likes = post.likes;
  const id = post.id;
  return {originalPoster, linkProps, caption, likes, id};
}

const PostsWrapper = styled.ul`
  &>li+li{
    margin-top: 16px;
  }
`;


