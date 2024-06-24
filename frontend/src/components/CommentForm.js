import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

export default function CommentForm({ content, rating, idTour, commenter }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formContent, setFormContent] = useState(content);
  const [formRating, setFormRating] = useState(rating);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleStarClick = (starRating) => {
    setFormRating(starRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      // Lấy ngày hiện tại
    const currentDate = new Date();
    
    // Định dạng ngày thành "dd-mm-yyyy"
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    let comObj = {
        "id" : uuidv4(),
        "idTour": idTour,
        "commenter": commenter,
        "content": formContent,
        "contentServer": "",
        "rating": formRating,
        "date": formattedDate,
        "quantityLike": 0,
    };
    fetch('http://localhost:5000/api/comments', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(comObj),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
        title: 'Thông báo',
        text: 'Đánh giá thành công',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      handleCloseModal();
      })
      .catch((err) => {
        
      });

  };

  return (
    <div>
      <button
        style={{
          border: 'none',
          backgroundColor: '#fff',
          padding: '8px 16px',
          borderRadius: '4px',
          color: '#333',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
        onClick={handleOpenModal}
      >
        Đánh giá
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Đánh giá"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            border: 'none',
            background: '#fff',
            padding: '24px',
            borderRadius: '4px',
            maxWidth: '400px',
            margin: '0 auto',
          },
        }}
      >
        <h2 style={{ marginBottom: '16px' }}>Đánh giá</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ marginBottom: '8px' }}>Nội dung:</label>
          <input
            type="text"
            name="content"
            value={formContent}
            onChange={(e) => setFormContent(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '16px',
            }}
          />
          <label style={{ marginBottom: '8px' }}>Chất lượng tour:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                isSelected={formRating >= star}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Gửi đánh giá
          </button>
        </form>
      </Modal>
    </div>
  );
}

const Star = ({ isSelected, onClick }) => {
  return (
    <span
      style={{
        cursor: 'pointer',
        color: isSelected ? '#ffc107' : '#ccc',
        fontSize: '24px',
        marginRight: '4px',
      }}
      onClick={onClick}
    >
      ★
    </span>
  );
};
