export function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// mức chênh lệch cho chép giữa trẻ em và người lớn
export const RATE_QUANTITY_OF_CHILD_WITH_ADULT = 2;

// title payment
export const METHOD_1 = "THANH TOÁN BẰNG THẺ NỘI ĐỊA ATM"
export const METHOD_2 = "THANH TOÁN BẰNG THẺ TÍN DỤNG"
export const METHOD_3 = "THANH TOÁN CHUYỂN KHOẢN QUA NGÂN HÀNG"
export const METHOD_4 = "THANH TOÁN BẰNG TIỀN MẶT TẠI VĂN PHÒNG LỮ HÀNH SAIGONTOURIST"
export const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const isPhoneValid = (phone) => {
  // Kiểm tra số điện thoại có đủ 10 số và số 0 ở đầu không
  return phone.length === 10 && phone.startsWith("0");
};
export const isPassportNumberValid = (passportNumber) => {
  const passportNumberPattern = /^[A-ZĐ]{1}[0-9]{7}$/; // Bắc đầu từ chữ In hoa và tiếp theo là 7 chữ số

  return passportNumberPattern.test(passportNumber);
};

export const formatCardNumber = (cardNumber) => {
  cardNumber = cardNumber+"";
  const formattedNumber = cardNumber.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ");
  return formattedNumber.trim();
};
export const isNumericString = (str) => {
  const numericStr = str.replace(/\s/g, ''); // Loại bỏ dấu khoảng trắng
  return /^\d+$/.test(numericStr); // Kiểm tra chuỗi số
};

export const now = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
export function formatDate (date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
