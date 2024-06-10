import React from "react";

export const Process = ({ step }) => {
    // Hàm xử lý trạng thái của từng bước
    const getStepClass = (currentStep, targetStep) => {
        if (currentStep > targetStep) {
            return "step-done";
        } else if (currentStep === targetStep) {
            return "step-active";
        } else {
            return "step-todo";
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <ol id="progress-bar">
                        <li className={getStepClass(step, 1)}>
                            <span className="step-title">Đăng nhập</span>
                        </li>
                        <li className={getStepClass(step, 2)}>
                            <span className="step-title">Chọn tour</span>
                        </li>
                        <li className={getStepClass(step, 3)}>
                            <span className="step-title">Nhập thông tin</span>
                        </li>
                        <li className={getStepClass(step, 4)}>
                            <span className="step-title">Chọn phương thức thanh toán</span>
                        </li>
                        <li className={getStepClass(step, 5)}>
                            <span className="step-title">Thanh toán</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};
