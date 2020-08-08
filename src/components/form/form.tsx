import React, { useRef, useState } from 'react'
import { Button } from '../actionButton/index'
import { Upload } from './upload'
import properties from '../../properties'
import './form.scss'

interface Form{
  formResponse: {
		label: any
	}
	validation: any
}

let formResponse = {}

const Form = (props: { fields: any, onSubmit: Function}) => {
	const { fields, onSubmit } = props
			, myRefs:any[] = []
			, myFormRef:any = useRef()
			, calculateChange = (index:any, name:any) => {
					formResponse[name] = myRefs[index].value
				}
			, [ validation, setValidation ] = useState([])
			, [ attachments, setAttachments ] = useState([])
			, [ resType, setResType ] = useState('')
			, isValid:Function = (label:never) => {
					return validation.length > 0 && validation.indexOf(label) !== -1 ? 'error-input' : null
				}

	const createInput = (item:{name: string, label: string}, index:any, type:any) => {
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

	const createFile = (item:{name: string}, index:number) => {
		const {name} = item
				, { 
						uploadSizeLimitPerFile, 
						uploadSizeLimitTotal, 
						uploadSizeLimitInMB, 
						uploadSizeLimitInGB
					} = properties
					
		const onFileUpload = (files:any) => {
			let totalSize = 0,
					validation:any = []
			files.forEach((file:File) => {
				const {size, name} = file
				
				if(size > uploadSizeLimitPerFile)
					validation.push(`${name} is above ${uploadSizeLimitInMB}`) 

				totalSize += size
			})

			if(totalSize > uploadSizeLimitTotal) {
				validation.push(`Maximum upload size allowed is ${uploadSizeLimitInGB}`)
			}

			if(validation.length) {
				setValidation(validation);
				return
			}

			setResType('')
			formResponse[name] = files
			setAttachments(files)
		}

		const onFileRemove = (index:number) => {
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

	const createTextarea = (item:{name: string, label: string}, index:number) => {
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

	const createSelect = (item:{name: string, label: string, options:any}, index:number) => {
		const { options, name, label } = item
				, createOption = (option:string, key:number) => {
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

	const renderFormFields = (item:any, index:number) => {
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
		const errorArr:String[] = []
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
		const isValid:any = validate()
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
			<Button buttonType="reset" type="secondary" displayText="Reset" className="reset" />
			<Button buttonType="submit" type="primary" displayText="Submit" className="submit" />
		</form>
	)
}

export default Form