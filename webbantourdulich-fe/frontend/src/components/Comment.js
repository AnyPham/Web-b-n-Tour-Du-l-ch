import { Person, ThumbUpAlt, SendSharp } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getcommentsByIdTour } from '../redux/selectors';
import SubComment from './SubComment';
import { fetchComments } from '../redux/slices/CommentSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Comment({ id }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [sentComments, setSentComments] = useState([]);
  const comments = useSelector((state) => getcommentsByIdTour(state, id));
  const [showInput, setShowInput] = useState(null); // Lưu trạng thái hiển thị input, null nếu không có input nào được hiển thị

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleOnChangeComment = (e) => {
    setComment(e.target.value);
  };

  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user')) || null;

  const handleToggleInput = (index) => {
    const isAuthenticated = user;
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Vui lòng đăng nhập trước khi bình luận',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      navigate('/login'); // Chuyển hướng nếu không đăng nhập
      return;
    }

    if (showInput === index) {
      setShowInput(null); // Đóng input nếu đang hiển thị và người dùng bấm vào phản hồi cùng item
    } else {
      setComment("")
      setShowInput(index); // Hiển thị input của item được bấm vào phản hồi
    }
  };

  const handleSubmitInput = (index) => {
    let idComment = index;
    let commenter = user.fullname;
    let content = comment;
    let comObj = { idComment, commenter, content };
    fetch('http://localhost:5000/api/subComments', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(comObj),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {
        // Handle error
      });
    setComment('');
    setShowInput(null); // Đóng input sau khi gửi phản hồi
  };

  return (
    <>
      <div className='container-comment'>
        <div className='title'>Đánh giá gần đây</div>
        <div className='comments'>
          {comments.map((item) => (
            <div key={item.id} className='item'>
              <div className='account'>
                <Person />
                {item.commenter}
              </div>
              <div className='content-comment'>
                <div className='container-rate'>
                  <div className='score'>{item.rating}</div>
                  <div className='text-core'>Rất tốt</div>
                  <div className='date'>{item.date}</div>
                </div>
                <div className='text-comment-1'>{item.content}</div>
                {item.contentServer && (
                  <div className='text-comment-server'>{item.contentServer}</div>
                )}

                <div className='container-feedback'>
                  <div className='text-like'>Thích</div>
                  <div className='feedback' onClick={() => handleToggleInput(item.id)}>
                    Phản hồi
                  </div>
                  <div className='quantity-like'>
                    <div className='number'>{item.quantityLike} </div>
                    <div className='container-like'>
                      <ThumbUpAlt />
                    </div>
                  </div>
                </div>
                {showInput === item.id && (
                  <div className='container-input-feedback'>
                    <input
                      onChange={handleOnChangeComment}
                      className='input-feedback'
                      value={comment}
                      type='text'
                    />
                    <div className='icon-send' onClick={() => handleSubmitInput(item.id)}>
                      <SendSharp />
                    </div>
                  </div>
                )}

                <SubComment id={item.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
