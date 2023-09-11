import { React, useState, useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';

export const AccountDetail = () => {
    const [state, setState] = useState({
        input: {}
    })
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()


    const { id } = useParams()
    useEffect(() => {
        loadSingleData()
    }, [id])

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            input: {
                ...prevState.input,
                [id]: value
            }
        }))

    }

    const loadSingleData = () => {
        console.log(id)
        fetch("/api/accountDetail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                if (data.status) {
                    setState(prevState => ({
                        ...prevState,
                        input: data.data
                    }))
                    // document.title = data.data.subject_id + ' ' + data.data.subject_name
                }
            });
    }
    

    const submit = (e) => {
        e.preventDefault()
        console.log(state.input)
        setSubmitting(true)
        fetch(typeof (state.input.account_id) === 'undefined' ? "/api/createaccount" : "/api/updateaccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(state.input)
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                alert(data.message);
                if (data.status) {
                    closeForm()
                }
                setSubmitting(false)
            });

    }

    const closeForm = () => {
        navigate(-1)
    }

    return(
        <div className="container">
        <h2 className="mb-3">{typeof (state.input.account_id) === 'undefined' ? 'Create Account' : `Update Account : ${state.input.first_name}`}</h2>
        <div className="row">
            <div className="col-12 col-md-8">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Account ID</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="account_id" className="form-control" placeholder="ID" onChange={handleChange} value={state.input.account_id} disabled />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Username</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="first_name" className="form-control" placeholder="Username" onChange={handleChange} value={state.input.first_name} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Password</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="password" className="form-control" placeholder="Password" onChange={handleChange} value={state.input.password} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4"> Account Type</label>
                                <div className="col-12 col-md-8">
                                    <select type="text" id="account_type" className="form-control" placeholder="Credit Points" onChange={handleChange} value={state.input.account_type} required>
                                        <option value="">- select -</option>
                                        <option value="e">Hilti Engineer</option>
                                        <option value="a">System Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3"></div>
                            <div className="center-side-button" style={{ float: "right" }} >
                                <button type="submit" className="btn-lg me-2" disabled={submitting}>{submitting ? 'Submitting' : 'Submit'}</button>
                                <button type="button" className="btn-lg" onClick={closeForm} disabled={submitting}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
    )
}