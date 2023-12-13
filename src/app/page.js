import CategoryList from "@/components/CategoryList";
import Posts from "@/components/Posts";
import { postsData } from "@/utils/postsData";
// import { postsData } from "@/utils/postsData";

const getPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/`, {
      cache: "no-store",
    });
    if (res.ok) {
      const posts = res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
};

const Home = async () => {
  const postsData = await getPosts();
  // console.log(postsData);
  return (
    <div className="">
      <span>
        <hr className="w-[40px] h-[5px] bg-themeColor border-0 ml-4 rounded-lg" />
        <h3>Latest</h3>
      </span>
      <CategoryList />
      {postsData && postsData.length > 0 ? (
        postsData.map((post) => (
          <Posts
            key={post.id}
            title={post.title}
            content={post.content}
            author={post.authorEmail}
            datapublished={post.createdAt}
            category={post.catName}
            links={post.links || []}
            thumbnail={post.imageUrl}
          />
        ))
      ) : (
        <h2 className="py-6">No posts to display!</h2>
      )}
    </div>
  );
};

export default Home;
