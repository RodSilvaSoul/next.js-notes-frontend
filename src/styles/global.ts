import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
	  box-sizing: border-box;
	  padding: 0;
	  margin: 0;
	  line-height: 1.5;
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

  body {
	  font-family: 'Roboto', sans-serif;
  }

	button {
		cursor: pointer;
	}

	button[disabled] {
		cursor: wait;
		opacity: 0.8;
	}

	* {
		transition: background-color 0.3s, color 0.3s;
	}
`;

export { GlobalStyles };
