/* 
1. Emmet
    rcc => rend component class
    rcf => rend component function

2. Components
    Use <Fragment> or <> to wrap multi element

3. Life cycle
    * Initialization: Khởi tạo state và props (Bên trong constructor)
    * Mouting: Component render lần đầu tiên

        * componentWillMount(): 
        Được khởi chạy khi một component chuẩn bị được mount (tức là trước khi thực hiện render), 
        sau khi thực hiện xong componentWillMount() thì component mới có thể được mount
        ==> Lưu ý: Không nên thực hiện bất cứ thay đổi liên quan đến state, props hay call API
        vì thời gian chuẩn bị mount rất ngắn

        * componentDidMount():
        Được gọi khi component đã được mount (render thành công ), 
        quá trình này xảy ra sau khi componentWillMount() thực hiện xong. Trong phương thức này bạn có thể gọi API, thay đổi state, props.

    * Updating: Giai đoạn re-render khi props và state thay đổi

        * shouldComponentUpdate():
        Phương thức này xác định xem component có nên được render lại hay không ? Theo mặc định, nó trả về true. 
        Nhưng bạn có thể thay đổi giá trị trả về của nó theo từng trường hợp.
        Nó sẽ nhận về 2 tham số truyền vào là nextState và nextProps.

        * componentWillUpdate():
        Phương thức này được gọi trước khi tiến hành re-render, 
        bạn có thể thực hiện các hành động như update state, props,...
        trong phương thức này trước khi tiến hành re-render. 
        Giống như shouldComponentUpdate(), componentWillUpdate() sẽ nhận vào 2 tham số đó là nextState và nextProps

        * componentDidUpdate():
        Phương thức này được gọi khi component đã re-render xong. Chúng ta có ví dụ về cả 3 phương thức về đề cập ở trên.
    * Unmounting: Đây là bước cuối cùng trong mỗi component, khi tất cả các tác vụ hoàn thành và bạn tiến hành unmount DOM
        * componentWillUnmount();
4. Props - prop down / Lifting state up - prop down function

*/
import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import WelcomeCss from '../../assets/css/Welcome.css'

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = { myName: "Nguyen Tien Dung", count: 0, form: { email: "", password: "" }, isShowForm: false };
        this.year = 2022;
        this.courses = [
            {
                name: "php",
                id: "1",
                price: "200000"
            },
            {
                name: "java",
                id: "2",
                price: "300000"
            }, {
                name: "javascript",
                id: "3",
                price: "400000"
            }, {
                name: "react",
                id: "4",
                price: "1000000"
            },
        ]
    }

    decrease() {
        this.setState((state) => {
            return {
                ...state,
                count: --state.count
            }
        })
    }
    increase() {
        this.setState((state) => {
            return {
                ...state,
                count: ++state.count
            }
        })
    }
    changeColor() {
        var welcome = document.getElementById("welcome");
        ReactDOM.findDOMNode(welcome).style.color = "red";
    }

    // Life cycle
    componentWillMount() {
        console.log('component will mount');
    }
    componentDidMount() {
        console.log("component did mount");
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState)
        if (nextState.count < 0) return false
        return true;
    }
    componentWillUpdate() {
        console.log('component will update');
    }
    componentDidUpdate() {
        console.log('component did update');
    }
    componentWillUnmount() { // as mounted in vue
        console.log('component will unmount')

    }

    // Form
    submit(e) {
        e.preventDefault();
        console.log(this.state.form);
    }
    reset() {
        this.setState(state => ({
            ...state,
            form: { email: "", password: "" }
        }))
    }



    render() {
        return (
            <Fragment>
                <h1 id="welcome">Welcome {this.props.name} aka {this.state.myName}</h1>
                <h3>Hello Reactjs</h3>
                <h1>{this.state.count}</h1>
                <h3>{this.year}</h3>
                <button onClick={() => { this.year++ }}>Change year</button>
                <button onClick={this.decrease.bind(this)}>Decrease</button>
                <button onClick={this.increase.bind(this)}>Increase</button>
                <button onClick={() => { this.changeColor() }}>Change color</button>
                <button onClick={() => { this.forceUpdate() }}>Force update (Re-render)</button>

                <hr class="w-100"/>
                <h3>Form</h3>
                <Button onClick={() => {
                    this.setState(state => ({
                        ...state,
                        isShowForm: !state.isShowForm
                    }))
                }}>Toggle form</Button>
                {this.state.isShowForm ?
                    <form onSubmit={(event) => {
                        this.submit(event);
                    }}>
                        <input class="w-100" type="email" value={this.state.form.email} onChange={(event) => {
                            this.setState((state) => {
                                var newState = state;
                                newState.form.email = event.target.value;
                                return newState;
                            })
                        }} />
                        <input class="w-100" type="password" value={this.state.form.password} onChange={(event) => {
                            this.setState((state) => {
                                var newState = state;
                                newState.form.password = event.target.value;
                                return newState;
                            })
                        }} />
                        <div className={WelcomeCss}>
                            <Button variant="primary" className="mx-2 my-2" type="submit">Submit</Button>
                            <Button variant="success" className="mx-2 my-2" onClick={this.reset.bind(this)}>Reset</Button>
                        </div>
                    </form> : ""}
                    <hr class="w-100"/>
                    <h3>List and key</h3>
                    <ul>
                        {this.courses.map(course => {
                            return <li key={course.id}>{course.name}</li>;
                        })}
                    </ul>
            </Fragment>
        )
    }
}


// Prop validation
Welcome.defaultProps = {
    name: "DefaultName",
    propTypeTest: "two"
}

Welcome.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    propTypeTest: PropTypes.oneOf(["one", "two"])
}