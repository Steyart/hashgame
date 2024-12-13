/** @type {import('tailwindcss').Config} */

export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
		spacing: Array.from({
			length: 1000
		}).reduce((map, ss, index) => {
			map[index] = `${index / 52.4}rem`;
			return map;
		}, {}),
		fontSize: {
			'lm': '0.11rem', //6px
			'lx': '0.15rem', //8px
			'll': '0.19rem', //10px
			'xs': '0.23rem', //12px
			'sm': '0.27rem', //14px
			'base': '0.31rem', //16px
			'lg': '0.34rem', //18px
			'xl': '0.38rem', //20px
			'1.5xl': '0.42rem', //22px
			'2xl': '0.46rem', //24px
			'2.5xl': '0.5rem', //26px
			'3xl': '0.53rem', //28px
			'3.5xl': '0.57rem', //30px
			'4xl': '0.61rem', //32px
		},
		borderRadius: {
			none: '0',
			sm: '2px', // 修改为px
			default: '4px', // 修改为px 
			md: '6px', // 修改为px
			lg: '8px', // 修改为px
			xl: '12px', // 修改为px
			'2xl': '16px', // 修改为px
			'3xl': '24px', // 修改为px
			full: '9999px', // 修改为px
			tt: '12px 12px 0 0',
			
		},
	},
	plugins: [],
}

