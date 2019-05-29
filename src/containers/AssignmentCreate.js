import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Icon, Button, Divider } from 'antd';
import QuestionForm from '../containers/QuestionForm';
import Hoc from '../hoc/hoc';
import { createASNT } from '../store/actions/assignments';

class AssignmentCreate extends React.Component {
    state = {
        formCount: 1,
    }

    remove = () => {
        const { formCount } = this.state;
        this.setState({
            formCount: formCount - 1
        });
    };

    add = () => {
        const { formCount } = this.state;
        this.setState({
            formCount: formCount + 1
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const questions = [];
                for (let i = 0; i < values.questions.length; i += 1) {
                    questions.push({
                        title: values.question[i],
                        choices: values.questions[i].choices.filter(el => el !== null),
                        answer: values.answer[i]
                    })
                }
                const asnt = {
                    teacher: this.props.username,
                    title: values.title,
                    questions
                };
                this.props.createASNT(this.props.token, asnt);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const questions = []
        for (let i = 0; i < this.state.formCount; i += 1) {
            questions.push(
                <Hoc key={i}>
                    {questions.length > 0 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={questions.length === 0}
                            onClick={() => this.remove()}
                        />
                    ) : null}
                    <QuestionForm id={i} {...this.props} />
                    <Divider />
                </Hoc>

            )
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <h1>Create an assignment</h1>
                <Form.Item label="Title: ">
                    {getFieldDecorator(`title`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                message: "Please input a title",
                            },
                        ],
                    })(<Input placeholder="Add a title" />)}
                </Form.Item>
                {questions}
                <Form.Item >
                    <Button type="secondary" onClick={this.add}>
                        <Icon type="plus" /> Add question
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedAssignmentCreate = Form.create()(AssignmentCreate);

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.assignments.loading,
        username: state.auth.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createASNT: (token, asnt) => dispatch(createASNT(token, asnt)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedAssignmentCreate);