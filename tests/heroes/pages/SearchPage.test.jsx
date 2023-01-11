import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"

const mockedUsedNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));


describe('Pruebas en <SearchPage />', () => {

  beforeEach(() => jest.clearAllMocks());

  test('Debe de mostrarse correctamente con valores por defecto', () => {

    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();

    //screen.debug();
  });


  test('Debe mostrar a Batman y el input con el valor del queryString', () => {

    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');

    //Aquí se espera que el valor del input sea batman
    expect(input.value).toBe('batman');

    const img = screen.getByRole('img');

    //Aquí se espera que la imagen del herocard sea la de batman
    expect(img.src).toContain('heroes/dc-batman.jpg')

    const alert = screen.getByLabelText('alert-danger');
    expect(alert.style.display).toBe('none');

  });

  test('Debe mostrar un error si no se encuentra el hero (batman123)', () => {

    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    );

    const alert = screen.getByLabelText('alert-danger');

    expect(alert.style.display).toBe('');
  })


  test('Debe llamar el navigate a la pantalla nueva con el argumento superman', () => {

    const inputValue = 'superman';

    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    );


    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { name: 'searchText', value: inputValue } })

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockedUsedNavigate).toHaveBeenCalledWith(`?q=${inputValue}`)
  });


});