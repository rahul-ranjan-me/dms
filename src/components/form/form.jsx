import React, { useRef, useState } from 'react'
import { Button } from '../actionButton/index'
import { Upload } from './upload'
import './form.scss'
let formResponse = {}

const Form = (props) => {
	const { fields, onSubmit } = props
			, myRefs= []
			, myFormRef = useRef()
			, calculateChange = (index, name) => {
					formResponse[name] = myRefs[index].value
				}
			, [ validation, setValidation ] = useState([])
			, [ attachments, setAttachments ] = useState([])
			, [ resType, setResType ] = useState('')
			, isValid = (label) => {
					return validation.length > 0 && validation.indexOf(label) !== -1 ? 'error-input' : null
				}

	const createInput = (item, index, type) => {
		const {name, label} = item
		
		return (
			<div className="form-field" key={`${name}${index}`}>
				<label htmlFor={name}>{label}</label>
				<input 
					id={name} 
					step="0.01" 
					min="0" 
					className={isValid(label)} 
					type={type} 
					name={name} 
					ref={ref => {myRefs[index] = ref}} 
					onChange={() => calculateChange(index, name)} />
			</div>
		)
	}

	const createFile = (item, index) => {
		const {name} = item
		
		const onFileUpload = (files) => {
			let totalSize = 0,
						validation = []
			files.forEach((file, i) => {
				const {size, name} = file
				const val = size > 250 * 1000 * 1000 ? validation.push(`${name} is above 250 MB`) : null
				totalSize += size
			})
			if(totalSize > 5 * 1000 * 1000 * 1000) {
				validation.push(`Maximum upload size allowed is 5 GB`)
			}
			if(validation.length) {
				setValidation(validation);
				return
			}

			setResType('')
			formResponse[name] = files
			setAttachments(files)
		}

		const onFileRemove = (index) => {
			attachments.splice(index, 1)
			setAttachments([...attachments])
		}

		return (
			<div className="form-field" key={`${name}${index}`}>
				<Upload 
					className={(resType === 'error-type-file' && 'error') || (!!attachments.length && 'selected')}
					attachments={attachments}
					onUpload={onFileUpload}
					onRemove={onFileRemove}
				/>
			</div>
		)
	}

	const createTextarea = (item, index) => {
		const {name, label} = item
		
		return (
			<div className="form-field" key={`${name}${index}`}>
				<label htmlFor={name}>{label}</label>
				<textarea 
					id={name} 
					className={isValid(label)} 
					name={name}
					ref={ref => {myRefs[index] = ref}} 
					onChange={() => calculateChange(index, name)}></textarea>
			</div>
		)
	}

	const createSelect = (item, index) => {
		const { options, name, label } = item
				, createOption = (option, key) => {
						return <option value={option} key={`${options}${key}`}>{option}</option>
					}
		return (
			<div className="form-field" key={`${name}${index}`}>
				<label htmlFor={name}>{label}</label>
				<select 
					id={name} 
					className={isValid(label)} 
					name={name} 
					onChange={() => calculateChange(index, name)} 
					ref={ref => {myRefs[index] = ref}}>
					<option>Please select</option>
					{ options && options.map(createOption) }
				</select>
			</div>
		)
	}

	const renderFormFields = (item, index) => {
		switch(item.type){
			case 'text':
				return createInput(item, index, 'text')
			case 'number':
				return createInput(item, index, 'number')
			case 'textarea':
				return createTextarea(item, index)
			case 'dropdown':
				return createSelect(item, index)
			case 'file':
				return createFile(item, index)
			default:
				return createInput(item, index, 'text')
		}	
	}

	const validate = () => {
		const errorArr = []
		fields.forEach((field) => {
			if(field.required && !formResponse[field.name]){
				errorArr.push(`${field.label} is a required field.`)
			}
		})
		if(attachments.length < 1){
			errorArr.push(`Upload file is a required field.`)
		}
		return errorArr
	}

	const submitForm = (e) => {
		e.preventDefault()
		const isValid = validate()
		if(isValid.length > 0){
			setValidation(isValid)
		}else{
			setValidation([])
			onSubmit(formResponse)
			setAttachments([])
			myFormRef.current.reset()
			formResponse = {}
		}
	}

	const showErrors = () => {
		return (
			<div className="field-errors">
				<h3>Following errors require your attention:</h3>
				{ validation.map((item, key) => {
					return <p key={key}>{item}</p>
				}) }
			</div>
		)
	}

	return(
		<form ref={myFormRef} onSubmit={submitForm}>
			{ validation.length > 0 ? showErrors(): null }
			<div className="form-fields">
				{ fields.map(renderFormFields) }
			</div>
			<Button buttonType="reset" type="secondary" displayText="Reset" />
			<Button buttonType="submit" type="primary" displayText="Submit" />
		</form>
	)
}

export default Form