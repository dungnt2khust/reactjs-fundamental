// Higher-Order Components(HOC) theo định nghĩa nó là một funciton nhận vào một component và trả về một component
import React from 'react';
//Đây được gọi là một HOC, nó nhận vào 1 component
//và trả ra một component
const withHoverOpacity = (ImageComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                opacity: 1,
            };
            //bind this
            this.onMouseLeave = this.onMouseLeave.bind(this);
            this.onMouseEnter = this.onMouseEnter.bind(this);
        }
        //Được gọi khi chuột được di vào
        onMouseEnter() {
            this.setState({
                opacity: 0.5,
            });
        }
        //Được gọi khi chuột được rời đi
        onMouseLeave() {
            this.setState({
                opacity: 1,
            });
        }
        render() {
            return (
                <div
                    style={{ opacity: this.state.opacity }}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <ImageComponent />
                </div>
            );
        }
    };
};

//Các component là các ảnh cần Hover
const Image1 = (props) => {
    return <img src="https://freetuts.net/public/logo/logo.png" alt="freetuts" />;
};
const Image2 = (props) => {
    return (
        <img
            src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
            alt="facebook"
        />
    );
};

//Lúc này mình truyền vào HOC một component
//và mình sẽ nhận vào một component mới

//Ở đây mình có thể hiển thị rất nhiều ảnh 
// mà không cần phải xây dựng component hỗ trợ việc làm
//mờ ảnh quá nhiều
const ImageWithHoverOpacity1 = withHoverOpacity(Image1);
const ImageWithHoverOpacity2 = withHoverOpacity(Image2);

//Hiển thi component
export default function HOC() {
    return (
        <>
            <ImageWithHoverOpacity1 />
            <ImageWithHoverOpacity2 />
        </>
    );
}