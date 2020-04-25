import cn from 'classnames'
import Head from 'next/head'
import useSmartquotes from '../hooks/useSmartquotes'
import pageStyles from '../styles/page.module.css'
import typography from '../styles/typography.module.css'

export default (props) => {
	useSmartquotes()
	return (
		<article className={cn(pageStyles.container, typography.text)}>
			{props.title && <h1 className={cn(typography.title)}>{props.title}</h1>}
			{props.children}
		</article>
	)
}