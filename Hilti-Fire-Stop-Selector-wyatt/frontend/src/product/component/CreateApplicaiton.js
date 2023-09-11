import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const CreateApplication = () => {
    const [state, setState] = useState({
        input: {}
    })

    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

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

    
    const checkType = (input) => {
        if(input === 'Electrical'){
            return<div>
                        <div className="form-group row">
                                <label className="col-12 col-md-4">Electrical Service Type</label>
                                    <div className="col-12 col-md-8">
                                        <input type="text" id="electrical_service_type" className="form-control" placeholder="electrical_service_type" onChange={handleChange} value={state.input.electrical_service_type} required/>
                                    </div>
                        </div>
                        <div className="form-group row">
                        <label className="col-12 col-md-4">Electrical Service Detail</label>
                            <div className="col-12 col-md-8">
                                <input type="text" id="electrical_service_detail" className="form-control" placeholder="electrical_service_detail" onChange={handleChange} value={state.input.electrical_service_detail} required/>
                            </div>
                        </div>
                </div>
                   
        }
        else if(input === 'HVAC'){
            return <div>
                        <div className="form-group row">
                            <label className="col-12 col-md-4">HVAC Pipe Type</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="hvac_pipe_type" className="form-control" placeholder="hvac_pipe_type" onChange={handleChange} value={state.input.hvac_pipe_type} required/>
                                </div>
                        </div>
                        <div className="form-group row">
                        <label className="col-12 col-md-4">HVAC Pipe Material</label>
                            <div className="col-12 col-md-8">
                                <input type="text" id="hvac_pipe_material" className="form-control" placeholder="hvac_pipe_material" onChange={handleChange} value={state.input.hvac_pipe_material} required/>
                            </div>
                        </div>
                        <div className="form-group row">
                        <label className="col-12 col-md-4">HVAC Pipe Specification</label>
                            <div className="col-12 col-md-8">
                                <input type="text" id="hvac_pipe_speci" className="form-control" placeholder="hvac_pipe_speci" onChange={handleChange} value={state.input.hvac_pipe_speci} required/>
                            </div>
                        </div>
                    </div>
        }
        else if(input === 'Plumbing'){
            return <div>
            <div className="form-group row">
                    <label className="col-12 col-md-4">Plumbing Pipe Type</label>
                        <div className="col-12 col-md-8">
                            <input type="text" id="plumbing_pipe_type" className="form-control" placeholder="plumbing_pipe_type" onChange={handleChange} value={state.input.plumbing_pipe_type} required/>
                        </div>
                </div>
                <div className="form-group row">
                <label className="col-12 col-md-4">Plumbing Pipe Size</label>
                    <div className="col-12 col-md-8">
                        <input type="text" id="plumbing_pipe_size" className="form-control" placeholder="plumbing_pipe_size" onChange={handleChange} value={state.input.plumbing_pipe_size} required/>
                    </div>
                </div>
                <div className="form-group row">
                <label className="col-12 col-md-4">Plumbing Penetration Type</label>
                    <div className="col-12 col-md-8">
                        <input type="text" id="plumbing_pen_type" className="form-control" placeholder="plumbing_pen_type" onChange={handleChange} value={state.input.plumbing_pen_type} required/>
                    </div>
                </div>
            </div>
        }
    }

    const submit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        console.log(state.input)
        fetch("/api/createApplication", {
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
        <h2 className="mb-3">{typeof (state.input.application_id) === 'undefined' ? 'Create Application' : `Update Application : ${state.input.application_name}`}</h2>
        <div className="row">
            <div className="col-12 col-md-8">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Application ID</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_id" className="form-control" placeholder="ID" onChange={handleChange} value={state.input.application_id} disabled />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Application Name</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_name" className="form-control" placeholder="Application Name" onChange={handleChange} value={state.input.application_name} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Integrity</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_integrity" className="form-control" placeholder="Integrity" onChange={handleChange} value={state.input.application_integrity} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Insulation</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_insulation" className="form-control" placeholder="Insulation" onChange={handleChange} value={state.input.application_insulation} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Application Type</label>
                                <div className="col-12 col-md-8">
                                    <select type="text" id="application_type" className="form-control" placeholder="" onChange={handleChange} value={state.input.application_type} required>
                                        <option value="">- Select -</option>
                                        <option value="Electrical">Electrical</option>
                                        <option value="HVAC">HVAC</option>
                                        <option value="Plumbing">Plumbing</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Wall or Floor?</label>
                                <div className="col-12 col-md-8">
                                <select type="text" id="application_wallfloor" className="form-control" placeholder="" onChange={handleChange} value={state.input.application_wallfloor} required>
                                        <option value="">- Select -</option>
                                        <option value="Wall">Wall</option>
                                        <option value="Floor">Floor</option>
                                </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Construction Type</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_construction_type" className="form-control" placeholder="Construction Type" onChange={handleChange} value={state.input.application_construction_type} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Subcategory</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_subcategory" className="form-control" placeholder="Subcategory" onChange={handleChange} value={state.input.application_subcategory} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Thickness</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_thickness" className="form-control" placeholder="Thickness (mm)" onChange={handleChange} value={state.input.application_thickness} required/>
                                </div>
                            </div>
                            <div>
                                {checkType(state.input.application_type)}
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Application Maximum Pipe Size</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_max_pipe_size" className="form-control" placeholder="Application Maximum Pipe Size" onChange={handleChange} value={state.input.application_max_pipe_size} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Application Additional Product</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_sub_comp" className="form-control" placeholder="Application Additional Product" onChange={handleChange} value={state.input.application_sub_comp}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Application Hyperlink</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_hyper" className="form-control" placeholder="Application Hyperlink" onChange={handleChange} value={state.input.application_hyper}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Application Description</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_desc" className="form-control" placeholder="Application Description" onChange={handleChange} value={state.input.application_desc}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Application Additional Information 1</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_additional_info1" className="form-control" placeholder="Application Additional Information 1" onChange={handleChange} value={state.input.application_additional_info1}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Application Additional Information 2</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="application_additional_info2" className="form-control" placeholder="Application Additional Information 2" onChange={handleChange} value={state.input.application_additional_info2}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Approval Name</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="approval_number" className="form-control" placeholder="Approval Number" onChange={handleChange} value={state.input.approval_number}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Approval Page</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="approval_page" className="form-control" placeholder="Approval Page" onChange={handleChange} value={state.input.approval_page}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Approval Table</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="approval_table" className="form-control" placeholder="Approval Table" onChange={handleChange} value={state.input.approval_table}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Approval Figure Number</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="approval_figure" className="form-control" placeholder="Approval Figure" onChange={handleChange} value={state.input.approval_figure}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-12 col-md-4">Approval Hyperlink</label>
                                <div className="col-12 col-md-8">
                                    <input type="text" id="approval_hyper" className="form-control" placeholder="Approval Hyperlink" onChange={handleChange} value={state.input.approval_hyper}/>
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