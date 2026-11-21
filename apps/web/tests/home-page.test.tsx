import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from '../src/app/page';

describe('HomePage', () => {
  it('renders portfolio heading and Singapore insurance context', () => {
    render(<HomePage />);
    expect(screen.getByText('Family Insurance Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Alice Tan')).toBeInTheDocument();
    expect(screen.getByText('Lucas Tan')).toBeInTheDocument();
  });

  it('displays active policy cards', () => {
    render(<HomePage />);
    expect(screen.getByText('AIA Guaranteed Protect Plus III')).toBeInTheDocument();
    expect(screen.getByText('GREAT SupremeHealth STANDARD & Rider')).toBeInTheDocument();
  });
});
