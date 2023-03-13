import React from 'react'
import {render, screen} from '@testing-library/react'
import App from './App'
import any = jasmine.any

test('renders learn react link', () => {
    render(<App store={{store: any}}/>)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
