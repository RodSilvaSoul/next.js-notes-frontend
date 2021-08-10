import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	
	a {
		text-decoration: none;
	}

	html {
		@media(max-width: ${(props) => props.theme.breakPoints.lg}) {
			font-size: 93.75%;
		}

		@media(max-width: ${(props) => props.theme.breakPoints.md}) {
			font-size: 87.5%; ;
		}
	}
`;
