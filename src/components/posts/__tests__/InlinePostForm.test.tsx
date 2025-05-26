import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InlinePostForm from '../InlinePostForm';

// Mock the useForm hook
vi.mock('../../../hooks/useForm', () => ({
  useForm: () => ({
    formData: { name: '', description: '' },
    errors: {},
    handleChange: vi.fn(),
    handleBlur: vi.fn(),
    validateForm: () => true,
    resetForm: vi.fn(),
  }),
}));

describe('InlinePostForm Component', () => {
  const user = userEvent.setup();
  const mockSubmit = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders the form with all required fields', () => {
    render(<InlinePostForm onSubmit={mockSubmit} />);
    
    // Check form elements
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });
  
  it('shows loading state when loading prop is true', () => {
    render(<InlinePostForm onSubmit={mockSubmit} loading={true} />);
    
    // Check loading state
    expect(screen.getByText('Creating...')).toBeInTheDocument();
    
    // Button should be disabled
    const submitButton = screen.getByText('Creating...');
    expect(submitButton.closest('button')).toHaveAttribute('disabled');
  });
  
  it('disables inputs when loading', () => {
    render(<InlinePostForm onSubmit={mockSubmit} loading={true} />);
    
    // Inputs should be disabled
    expect(screen.getByLabelText('Name')).toHaveAttribute('disabled');
    expect(screen.getByLabelText('Description')).toHaveAttribute('disabled');
  });
  
  it('calls onSubmit when form is submitted with valid data', async () => {
    const { container } = render(<InlinePostForm onSubmit={mockSubmit} />);
    
    // Get the form element
    const form = container.querySelector('form');
    
    // Submit the form
    if (form) {
      await user.click(screen.getByText('Create Post'));
    }
    
    // Check if onSubmit was called
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
