import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import '../styles/payment.scss'
import Navbar from "../components/Navbar";
import {Process} from "../components/Process";
import Footer from "../components/Footer";
import {ItemTourCheckout} from "../components/checkout/ItemTourCheckout";
import {useDispatch, useSelector} from "react-redux";
import {removeCheckout, updatePayment} from "../redux/slices/CheckoutSlice";
import Swal from "sweetalert2";
import {addCheckoutToLocal, removeCartTourFromLocal, user} from "../utils/localStorageUtils";
import {clearSelectedTour} from "../redux/slices/SelectedTourSlice";
import {removeCart} from "../redux/slices/CartsSlice";

export const Payment = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const selectedTour = useSelector((state) => state.selectedTour);
    const [checkedRules, setCheckedRules] = useState();
    useEffect(() => {
        const isAuthenticated = user; // Kiểm tra trạng thái đăng nhập

        if (!isAuthenticated && !selectedTour) {
            navigate('/cart'); // Chuyển hướng nếu không đăng nhập và không có selectedTour
        } else if (!isAuthenticated) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng đăng nhập trước khi thanh toán",
                icon: "warning",
                confirmButtonText: "OK",
            });
            dispatch(removeCheckout(checkout[checkout.length-1]))
            navigate('/login'); // Chuyển hướng nếu không đăng nhập
            return;
        } else if (!selectedTour) {
            navigate('/cart'); // Chuyển hướng nếu không có selectedTour
        }
    }, []);

    const [data, setData] = useState([])
    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/payment');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching payment:', error);
            }
        };

        fetchPayment();
    }, []);
    const [selectedPayment, setSelectedPayment] = useState(null)
    let checkout = useSelector((state) => state.checkout);
    checkout = checkout[checkout.length - 1];
    const dispatch = useDispatch();
    const handleCheckboxChange = (event) => {
        setCheckedRules(event.target.checked);
    };
    const handlePaymentSubmit = () => {
        const isAuthenticated = user; // Kiểm tra trạng thái đăng nhập

        if (!isAuthenticated && !selectedTour) {
            navigate('/cart'); // Chuyển hướng nếu không đăng nhập và không có selectedTour
        } else if (!isAuthenticated) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng đăng nhập trước khi thanh toán",
                icon: "warning",
                confirmButtonText: "OK",
            });
            dispatch(removeCheckout(checkout.id))
            navigate('/login'); // Chuyển hướng nếu không đăng nhập
            return;
        }
        if (!selectedPayment) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng chọn phương thức trước khi thanh toán",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }
        if(!checkedRules){
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng chấp nhận điều khoản",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }

        // lấy tên loại hình thanh toán
        const payment_method = data.find(item => item.status)?.title;

        const newCheckout = {
            ...checkout,
            payment_method: payment_method
        }
        dispatch(updatePayment(newCheckout))

        // Chuyển hướng đến trang xác nhận thanh toán
        navigate("/checkout");
    };
    const handleSelectedPayment = (id) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                // nếu bấm chọn 2 lần sẽ trở về trạng thái chưa chọn
                if (item.status) {
                    setSelectedPayment(null);
                    return {
                        ...item,
                        status: false,
                    };
                }
                setSelectedPayment(item.id);
                return {
                    ...item,
                    status: true,
                };
            }
            // chỉ được 1 cái chọn
            return {
                ...item,
                status: false,
            };
        });
        setData(updatedData);
    };

    return (
        <>
            <Navbar/>
            <Process step={4}/>
            <div className="bg-white">
            <div className="container pt-3 pb-3 mt-2 rounded" id="payment">
                <div className="row">
                    <div className="col-md-8">
                        <h3>Chọn phương thức thanh toán:</h3>
                        {
                            data.map((item) => (
                                <>
                                    <div className="col-md-12 " key={item.id}>
                                        <div
                                            className={`col-md-12 header-payment p-2 mb-1 d-flex justify-content-between align-items-center ${item.status ? "payment-selected " : ""}`}
                                            onClick={() => handleSelectedPayment(item.id)}>
                                            <div className="col-md-10">
                                                <h5>{item.title}</h5>
                                                <h6>{item.description}</h6>
                                            </div>
                                            {
                                                item.status ? <i className="fas fa-check icon-tick"></i> :
                                                    <i className="fas fa-chevron-down "></i>
                                            }
                                        </div>
                                        {
                                            item.status ?
                                                <div className="col-md-12 content-payment mt-1 mb-4">
                                                    <p>{item.content}</p>
                                                </div>
                                                : ""
                                        }
                                    </div>
                                </>))

                        }
                        <div className="col-md-12 mb-2">
                            <label className="font-weight-bold">
                                <input type="checkbox" id="agreement" name="agreement" required="required"
                                       checked={checkedRules}
                                       onChange={handleCheckboxChange}
                                /> Tôi đã đọc và đồng ý <a href="" target="_blank">điều khoản</a>
                            </label>
                            <div className="overflow-auto scroll rules">
                                <p>Điều khoản này là sự thoả thuận đồng ý của quý khách khi sử dụng dịch vụ thanh toán
                                    trên trang web <a href="http://www.saigontourist.net">www.saigontourist.net</a> của
                                    Công ty Dịch vụ Lữ hành Saigontourist (Lữ hành Saigontourist) và những trang web của
                                    bên thứ ba. Việc quý khách đánh dấu vào ô “Đồng ý” và nhấp chuột vào thanh “Chấp
                                    nhận” nghĩa là quý khách đồng ý tất cả các điều khoản thỏa thuận trong các trang web
                                    này.</p>

                                <p>&nbsp;</p>

                                <p><strong>Giải thích từ ngữ</strong></p>

                                <p>Điều khoản: là những điều quy định giữa Lữ hành Saigontourist và quý khách</p>

                                <p>Bên thứ ba: là những đơn vị liên kết với Lữ hành Saigontourist (OnePay, Vietcombank)
                                    nhằm hỗ trợ việc thanh toán qua mạng cho quý khách</p>

                                <p>Vé điện tử: là những thông tin và hành trình của quý khách cho chuyến đi được thể
                                    hiện trên một trang giấy mà quý khách có thể in ra được</p>

                                <p><strong>Về sở hữu bản quyền</strong></p>

                                <p>Trang web <a href="http://www.saigontourist.net">www.saigontourist.net</a> thuộc
                                    quyền sở hữu của Lữ hành Saigontourist và được bảo vệ theo luật bản quyền, quý khách
                                    chỉ được sử dụng trang web này với mục đích xem thông tin và đăng ký thanh toán
                                    online cho cá nhân chứ không được sử dụng cho bất cứ mục đích thương mại nào khác.
                                </p>

                                <p>Việc lấy nội dung để tham khảo, làm tài liệu cho nghiên cứu phải ghi rõ ràng nguồn
                                    lấy từ nội dung trang web Lữ hành Saigontourist. Không được sử dụng các logo, các
                                    nhãn hiệu&nbsp;Lữ hành Lữ hành Saigontourist dưới mọi hình thức nếu chưa có sự đồng
                                    ý của&nbsp;Lữ hành&nbsp;Saigontourist bằng văn bản.</p>

                                <p><strong>Về thông tin khách hàng</strong></p>

                                <p>Khi đăng ký thanh toán qua mạng, quý khách sẽ được yêu cầu cung cấp một số thông tin
                                    cá nhân và thông tin tài khoản.</p>

                                <p>Đối với thông tin cá nhân: Những thông tin này chỉ để phục vụ cho nhu cầu xác nhận sự
                                    mua dịch vụ của quý khách và sẽ hiển thị những nội dung cần thiết trên vé điện tử.
                                    Lữ hành Saigontourist cũng sẽ sử dụng những thông tin liên lạc này để gửi đến quý
                                    khách những sự kiện, những tin tức khuyến mãi và những ưu đãi đặc biệt nếu quý khách
                                    đồng ý. Những thông tin này của quý khách sẽ được Lữ hành Saigontourist bảo mật và
                                    không tiết lộ cho bên thứ ba biết ngoại trừ sự đồng ý của quý khách hoặc là phải
                                    tiết lộ theo sự tuân thủ luật pháp quy định.</p>

                                <p>Đối với thông tin tài khoản: Những thông tin này sẽ được Lữ hành Saigontourist và bên
                                    thứ ba áp dụng những biện pháp bảo mật cao nhất do các hệ thống thanh toán nổi tiếng
                                    trên thế giới như Visa và MasterCard cung cấp nhằm đảm bảo sự an toàn tuyệt đối của
                                    thông tin tài khoản quý khách.</p>

                                <p><strong>Về trang web liên kết</strong></p>

                                <p>Các trang web của Lữ hành Saigontourist có chứa những liên hệ kết nối với trang web
                                    của bên thứ ba. Việc liên kết trang web của bên thứ ba này nhằm chỉ cung cấp những
                                    sự tiện lợi cho quý khách chứ không phải là sự tán thành, chấp nhận những nội dung,
                                    thông tin sản phẩm của những trang web bên thứ ba. Lữ hành Saigontourist sẽ không
                                    chiu trách nhiệm về bất cứ trách nhiệm pháp lý nào liên quan đến những thông tin gì
                                    trong các trang web bên thứ ba.</p>

                                <p><strong>Về hủy tour</strong></p>

                                <p>Trong trường hợp hủy tour, quý khách vui lòng gửi email thông báo hủy tour đến Lữ
                                    hành Saigontourist. Lữ hành Saigontourist sẽ trao đổi và xác nhận lại tất cả các
                                    thông tin của quý khách. Khi hoàn tất việc xác nhận thông tin, Lữ hành Saigontourist
                                    sẽ hoàn tiền vào đúng tài khoản quý khách đã thanh toán sau khi trừ các khoản lệ phí
                                    hủy tour. Lệ phí hủy tour sẽ tùy thuộc vào từng tour tuyến quý khách đăng ký.</p>

                                <p><strong>Trách nhiệm của Lữ hành Saigontourist</strong></p>

                                <p>Lữ hành Saigontourist có nhiệm vụ bảo mật và lưu trữ an toàn các thông tin của quý
                                    khách với sự nghiêm túc cao nhất.</p>

                                <p>Giải quyết những thắc mắc, sai sót, vi phạm mà quý khách gặp phải trong quá trình
                                    thanh toán nếu do lỗi của Lữ hành Saigontourist.</p>

                                <p>Đảm bảo thực hiện đầy đủ mọi dịch vụ theo đúng chương trình mà quý khách đăng ký. Tuy
                                    nhiên chúng tôi có toàn quyền thay đổi lộ trình hoặc hủy bỏ chuyến đi du lịch bất cứ
                                    lúc nào mà chúng tôi thấy cần thiết vì sự an toàn cho quý khách.</p>

                                <p>Mọi thay đổi nếu có sẽ được thông báo nhanh chóng cho quý khách ngay trước ngày khởi
                                    hành hoặc ngay sau khi phát hiện những phát sinh.</p>

                                <p><strong>Trường hợp miễm trách nhiệm đối với Lữ hành Saigontourist</strong></p>

                                <p>Lữ hành Saigontourist không chịu trách nhiệm về tất cả những thông tin mà quý khách
                                    cung cấp bởi chúng tôi không dễ dàng xác nhận chính xác quý khách nào đăng ký thông
                                    tin.</p>

                                <p>Lữ hành Saigontourist không chịu trách nhiệm về việc thông tin của quý khách bị lấy
                                    cắp nếu như việc lấy cắp được thực hiện từ máy của quý khách do bị nhiễm virus máy
                                    tính hay do nguyên nhân nào khác.</p>

                                <p>Lữ hành Saigontourist không chịu trách nhiệm đối với quý khách nếu xảy ra việc hệ
                                    thống máy tính của quý khách bị hư hại trong khi đang thanh toán hoặc bị can thiệp
                                    liên quan tới việc sử dụng một trang bên ngoài.</p>

                                <p>Lữ hành Saigontourist không chịu trách nhiệm về việc mất dữ liệu thông tin của quý
                                    khách do sự cố khách quan như: thiên tai, hạn hán, hỏa hoạn, chiến tranh,…</p>

                                <p><strong>Trách nhiệm của khách hàng</strong></p>

                                <p>Quý khách cam kết hoàn toàn chịu trách nhiệm về các thông tin cá nhân, thông tin thẻ
                                    tín dụng đã được khai báo là trung thực, chính xác. Nếu có sai sót, giả mạo hay
                                    tranh chấp phát sinh thì Lữ hành Saigontourist có quyền hủy tour đã mua của quý
                                    khách.</p>

                                <p>Quý khách có nhiệm vụ kiểm tra thông tin tài khoản để kịp thời để báo cho Lữ hành
                                    Saigontourist nếu có những sự cố. Thời hạn trong vòng 30 ngày tính từ ngày thanh
                                    toán, Lữ hành Saigontourist sẽ không nhận giải quyết bất cứ kiếu nại nào từ việc
                                    thanh toán.</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <button
                                disabled={!selectedPayment}
                                className="btn btn-block btn-continue-booking rounded"
                                onClick={handlePaymentSubmit}
                            >
                                Thanh toán
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        {
                            selectedTour ? <ItemTourCheckout selectedTour={selectedTour}/> : ""
                        }
                    </div>
                </div>

            </div>
            </div>
            <Footer/>
        </>
    )
}