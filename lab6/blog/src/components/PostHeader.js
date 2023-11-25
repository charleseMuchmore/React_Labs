function PostHeader( { post }) {
    return (
    <>
        <div>
            Title: {post.title} <br />
            Time: {post.datetime} <br />
            Category: {post.category} <br />
            Author: {post.userId}
        </div>
    </>)
}

export default PostHeader;