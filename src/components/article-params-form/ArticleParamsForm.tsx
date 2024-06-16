import { useState, useRef, useEffect, SyntheticEvent } from 'react';
import { clsx } from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { useClose } from 'src/hooks/useClose';
import { Select } from 'components/select/Select';
import { RadioGroup } from 'components/radio-group';
import {
	defaultArticleState,
	fontSizeOptions,
	AppState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsProps = {
	title: string;
	appState: AppState;
	setAppState: React.Dispatch<
		React.SetStateAction<{
			fontFamilyOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
			fontSizeOption: OptionType;
		}>
	>;
};

export const ArticleParamsForm = ({
	title,
	setAppState,
	appState,
}: ArticleParamsProps) => {
	const rootRef = useRef(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const className = clsx(styles.container, isMenuOpen && styles.container_open);

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: rootRef,
	});

	const submitClick = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppState(formState);
		setIsMenuOpen(false);
	};

	const resetClick = () => {
		setFormState(defaultArticleState);
		setAppState(defaultArticleState);
		setIsMenuOpen(false);
	};

	const [formState, setFormState] = useState(appState);
	useEffect(() => setFormState(appState), [appState]);
	return (
		<div ref={rootRef}>
			<ArrowButton
				onClick={() => setIsMenuOpen((previous: boolean) => !previous)}
				isMenuOpen={isMenuOpen}
			/>
			<aside className={className}>
				<form
					className={styles.form}
					onSubmit={submitClick}
					onReset={resetClick}>
					<Text as='h1' size={31} weight={800} uppercase>
						{title}
					</Text>
					<Select
						title={'Шрифт'}
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(fontFamilyOption) =>
							setFormState({ ...formState, fontFamilyOption })
						}
					/>
					<RadioGroup
						title={'Размер шрифта'}
						options={fontSizeOptions}
						name={'fontSize'}
						selected={formState.fontSizeOption}
						onChange={(fontSizeOption) =>
							setFormState({ ...formState, fontSizeOption })
						}
					/>
					<Select
						title={'Цвет шрифта'}
						options={fontColors}
						selected={formState.fontColor}
						onChange={(fontColor) => setFormState({ ...formState, fontColor })}
					/>
					<Separator />
					<Select
						title={'Цвет фона'}
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(backgroundColor) =>
							setFormState({ ...formState, backgroundColor })
						}
					/>
					<Select
						title={'Ширина контента'}
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(contentWidth) =>
							setFormState({ ...formState, contentWidth })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
