import React from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

const Select = dynamic(() => import("react-select"), { ssr: false })

const fetchModels = () => fetch("/api/engines").then((res) => res.json())

const SelectionModel = () => {
    const { data: models, isLoading } = useSWR("models", fetchModels)
    const { data: model, mutate: setModel } = useSWR("model", {
        fallbackData: "gpt-4-turbo"
    })
  return (
    <Select 
        isSearchable={true}
        isLoading={isLoading}
        menuPosition='fixed'
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        className='text-black placeholder:text-white w-full'
        onChange={(e) => setModel((e as { value: string }).value)}
        styles={{
            control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "blue" : "#ffffff5",
                backgroundColor: "transparent"
            }),
            singleValue: (baseStyles) => ({
                ...baseStyles,
                color: "#ffffff"
            }),
            placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'white'
            }),
            input: (baseStyles) => ({
                ...baseStyles,
                color: 'white'
            })
        }}
    />
  )
}

export default SelectionModel
