import {fireEvent, render, screen} from '@testing-library/react'
import {InformationRow} from './InformationRow'
import {setDataToLocalStorage} from '@/lib/storage'
import {beforeEach, describe, expect, it, vi} from 'vitest'

vi.mock('@/lib/storage', () => ({
  getFromLocalStorage: vi.fn(),
  setDataToLocalStorage: vi.fn(),
}))

describe('InformationRow', () => {
  const mockCuisson = { name: 'Grill', weight: 1.5, duration: 30 }
  const mockOnUpdate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders cuisson details in non-editable mode', () => {
    render(<InformationRow cuisson={mockCuisson}
      index={0}
      onUpdate={mockOnUpdate} />)
    expect(screen.getByText('Grill')).toBeInTheDocument()
    expect(screen.getByText('1.5')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  it('switches to editable mode when edit button is clicked', () => {
    render(<InformationRow cuisson={mockCuisson}
      index={0}
      onUpdate={mockOnUpdate} />)
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(screen.getByDisplayValue('Grill')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1.5')).toBeInTheDocument()
    expect(screen.getByDisplayValue('30')).toBeInTheDocument()
  })

  it('updates cuisson details and calls onUpdate when save button is clicked', () => {
    render(<InformationRow cuisson={mockCuisson}
      index={0}
      onUpdate={mockOnUpdate} />)
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    fireEvent.change(screen.getByDisplayValue('Grill'), { target: { value: 'Roast' } })
    fireEvent.change(screen.getByDisplayValue('1.5'), { target: { value: '2.0' } })
    fireEvent.change(screen.getByDisplayValue('30'), { target: { value: '45' } })
    fireEvent.click(screen.getByRole('button', { name: /check/i }))
    expect(setDataToLocalStorage).toHaveBeenCalledWith('cuissons', [{ name: 'Roast', weight: 2.0, duration: 45 }])
    expect(mockOnUpdate).toHaveBeenCalled()
  })

  it('does not update cuisson details if cancel button is clicked', () => {
    render(<InformationRow cuisson={mockCuisson}
      index={0}
      onUpdate={mockOnUpdate} />)
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    fireEvent.change(screen.getByDisplayValue('Grill'), { target: { value: 'Roast' } })
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(setDataToLocalStorage).not.toHaveBeenCalled()
    expect(mockOnUpdate).not.toHaveBeenCalled()
  })
})
