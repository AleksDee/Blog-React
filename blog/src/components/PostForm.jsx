import React, { useState } from 'react';
import MyInput from './UI/button/input/MyInput';
import MyButton from './UI/button/MyButton';

export default function PostForm({ onAddNewPost }) {
  const [post, setPost] = useState({
    id: '',
    title: '',
    body: '',
  });
  const addNewPost = (e) => {
    e.preventDefault();
    setPost({ ...post, id: Date.now() });
    setPost({ title: '', body: '' });
    onAddNewPost(post);
  };
  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Описание поста"
      />
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
}
