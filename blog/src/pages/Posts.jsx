import { useState, useEffect, useRef } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../components/hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import useFetching from '../components/hooks/useFetching';
import { getPagesCount, getPagesArray } from '../API/utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../components/hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ selectedSort: '', searchQuery: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(
    posts,
    filter.selectedSort,
    filter.searchQuery
  );

  const lastElement = useRef();
  // const observer = useRef();

  // let pagesArray = getPagesArray(totalPages)

  // console.log(pagesArray)

  const [fetchPosts, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPagesCount(totalCount, limit));
    }
  );

  console.log(totalPages);

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  // useEffect(() => {
  //   if (isPostLoading) return;
  //   if (observer.current) observer.current.disconnect();
  //   let callback = function (entries, observer) {
  //     if (entries[0].isIntersecting && page < totalPages) {
  //       setPage(page + 1);
  //     }
  //   };
  //   observer.current = new IntersectionObserver(callback);
  //   observer.current.observe(lastElement.current);
  // }, [isPostLoading]);

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page]);

  // useEffect(() => {
  //   fetchPosts()
  // }, [page])

  // async function fetchPosts() {
  // setIsPostLoading(true)
  // const posts = await PostService.getAll();
  // setPosts(posts)
  // setIsPostLoading(false)
  // }

  const addNewPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
    };
    setPosts([...posts, newPost]);
    console.log(posts);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
    // fetchPosts(limit, page);
  };

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{ marginTop: '30px' }} onClick={(e) => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm onAddNewPost={addNewPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Количество элементов на странице"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 15, name: '15' },
          { value: -1, name: 'Показать все' },
        ]}
      ></MySelect>

      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList
        onRemovePost={removePost}
        posts={sortedAndSearchedPosts}
        title={'Список постов'}
      />
      <div ref={lastElement} style={{ height: 20, background: 'red' }}></div>
      {isPostLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Loader />
        </div>
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
