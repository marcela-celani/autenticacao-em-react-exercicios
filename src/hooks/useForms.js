import { useState } from "react"

const useForms = (initialState) => {

    const [form, setForm] = useState(initialState)

    const onChange = (e) => {
        const {value, id} = e.target
        setForm({...form, [id]: value})
    }

    const limparCampos = () =>{
      setForm(initialState)
    }

    return {form, onChange, limparCampos}
}

export default useForms