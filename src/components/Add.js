import React from 'react'
import { reduxForm, Field, change, reset } from 'redux-form'
import Resizer from 'react-image-file-resizer'
import reqres from '../apis/reqres'
import { connect } from 'react-redux'
import { compose } from 'redux'

class Add extends React.Component {


    state = {
        resizeImage: false,
        errorMsg: false,
        succesMsg: false
    }

    setResizeImage = () => {
        this.setState((prevState) => {
            return {
                resizeImage: !prevState.resizeImage
            }
        })

        this.props.dispatch(change('adduser', 'avatar', null))
        document.getElementById('files-upload').value = null;


    }

    onSubmit = async (formProps) => {

        console.log(formProps)

        let userData = {}

        if (!formProps.avatar) {
            userData = { ...formProps, avatar: 'https://reqres.in/img/faces/2-image.jpg' }
        }

        const data = await reqres.post('/users', userData)

        if (data.status === 201) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    succesMsg: true
                }
            })
            console.log(data)

        }
    }

    renderFileInput = ({ input, type, meta }) => {
        const { mime } = this.props;
        return (
            <div>
                <input
                    name={input.name}
                    id="files-upload"
                    type="file"
                    accept={mime}
                    onChange={event => this.handleChange(event, input)}
                />
            </div>
        );
    };

    renderError({ error, touched }) {
        if (error && touched) {
            return (
                <div>
                    <p className="form-errMsg">{error}</p>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta }) => {

        return (
            <div className="form-custom-input">
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                <div>{this.renderError(meta)}</div>
            </div>
        )
    }

    handleChange = async (event, input) => {
        event.preventDefault()
        let imageFile = event.target.files[0]

        if (imageFile) {

            const resizeFile = (file) => new Promise(resolve => {
                Resizer.imageFileResizer(file, 300, 300, 'JPEG', 70, 0,
                    uri => {
                        resolve(uri)
                    }, 'base64')
            });

            let image = await resizeFile(imageFile)

            const localImageUrl = URL.createObjectURL(imageFile)
            const imageObject = new window.Image()

            imageObject.onload = () => {
                imageFile.width = imageObject.naturalWidth
                imageFile.height = imageObject.naturalHeight
                input.onChange(imageFile)
                URL.revokeObjectURL(imageFile)
            };
            imageObject.src = this.state.resizeImage ? image : localImageUrl
        }
    };

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div id="popup1" className="overlay">
                <div className="popup">
                    <h2>{!this.state.succesMsg ? 'Add new user' : 'Thank you'}</h2>
                    <a className="close" href="#">&times;</a>
                    <div className="content">
                        {this.state.succesMsg && <div>
                            <p>You have succesfuly added new user!</p>
                            <button onClick={() => {
                                this.setState((prevState) => {
                                    this.props.reset('adduser');
                                    return {
                                        ...prevState,
                                        succesMsg: false
                                    }
                                })
                            }} className="button-alt">+ add new</button>
                        </div>}
                        {!this.state.succesMsg && <form onSubmit={handleSubmit(this.onSubmit)}>
                            <fieldset className="fieldset-class">
                                <label className="form-label">First name</label>
                                <Field
                                    name="firstname"
                                    className="field-class"
                                    type="text"
                                    component={this.renderInput}
                                    autoComplete="none"
                                />
                            </fieldset>
                            <fieldset className="fieldset-class">
                                <label className="form-label">Last name</label>
                                <Field
                                    className="field-class"
                                    name="lastname"
                                    type="text"
                                    component={this.renderInput}
                                    autoComplete="none"
                                />
                            </fieldset>
                            <fieldset className="fieldset-class">
                                <label className="form-label">Email</label>
                                <Field
                                    name="email"
                                    className="field-class"
                                    type="text"
                                    component={this.renderInput}
                                    autoComplete="none"
                                />
                            </fieldset>
                            <fieldset className="fieldset-class">
                                <label className="form-label">Avatar url</label>
                                <Field
                                    name="url"
                                    className="field-class"
                                    type="url"
                                    component={this.renderInput}
                                    autoComplete="none"
                                />
                            </fieldset>
                            <fieldset className="fieldset-class">
                                <label className="form-label">Resize image?</label>
                                <Field
                                    name="resize"
                                    type="checkbox"
                                    component="input"
                                    className="field-class"
                                    onChange={this.setResizeImage}
                                />
                            </fieldset>
                            <fieldset className="fieldset-class">
                                <label className="form-label">Avatar</label>
                                {this.state.errorMsg && <p>Odaberite sliku</p>}
                                <Field
                                    name="avatar"
                                    className="field-class"
                                    component={this.renderFileInput}
                                />
                            </fieldset>
                            <div>
                                {this.props.errorMessage}
                            </div>
                            <button disabled={pristine || submitting} className="button-alt">Add user</button>

                        </form>}
                    </div>
                </div>
            </div>
        )
    }
}

const validate = (formValues) => {

    const isUrlValid = (userInput) => {
        const res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null)
            return (false);
        else
            return (true);
    };

    const errors = {}

    if (!formValues.firstname) {
        errors.firstname = 'Required'
    }

    if (!formValues.lastname) {
        errors.lastname = 'Required'
    }

    if (!formValues.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
        errors.email = 'Invalid email address'
    }

    if (formValues.url && !isUrlValid(formValues.url)) {
        errors.url = 'Insert a valid URL'
    }

    return errors
}
export default compose(
    connect(null, {reset}),
    reduxForm({ form: 'adduser', validate })
)(Add)