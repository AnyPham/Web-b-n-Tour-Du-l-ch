import React, { useEffect } from 'react';
import { Person } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCommentsByIdComment } from '../redux/selectors';
import { fetchSubComments } from '../redux/slices/SubCommentSlice';

export default function SubComment(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchSubComments());
    }, [dispatch, props]);
  const subComments = useSelector((state) => getSubCommentsByIdComment(state, props.id));

  return (
    <div className="text-comment-2">
      {subComments.map((sub) => (
        <div className="item-comment-2" key={sub.id}>
          <div className="user-2">
            <Person />
            <div>{sub.commenter}</div>
          </div>
          <div className="content">{sub.content}</div>
        </div>
      ))}
    </div>
  );
}
