import {
  Box,
  Button,
  DropDown,
  DropDownItem,
  DropDownMenu,
  DropDownTrigger,
  Icon,
} from '@adminjs/design-system'
import React, { FC, useMemo } from 'react'
import { useTranslation } from '../../../hooks/index.js'
import ApiClient from '../../../utils/api-client.js'

const LanguageSelect: FC = () => {
  const {
    i18n: {
      language,
      options: { supportedLngs },
      // changeLanguage,
    },
    translateComponent,
  } = useTranslation()

  const api = new ApiClient()

  const availableLanguages: readonly string[] = useMemo(
    () => (supportedLngs ? supportedLngs.filter((lang) => lang !== 'cimode') : []),
    [supportedLngs],
  )

  if (availableLanguages.length <= 1) {
    return null
  }

  return (
    <Box flex alignItems="center">
      <DropDown>
        <DropDownTrigger>
          <Button color="text">
            <Icon icon="Globe" />
            {translateComponent(`LanguageSelector.availableLanguages.${language}`, { defaultValue: language })}
          </Button>
        </DropDownTrigger>
        <DropDownMenu>
          {availableLanguages.map((lang) => (
            <DropDownItem
              key={lang}
              onClick={async () => {
                window.location.href = await api.switchLanguage(lang)
              }}
            >
              {translateComponent(`LanguageSelector.availableLanguages.${lang}`, { defaultValue: lang })}
            </DropDownItem>
          ))}
        </DropDownMenu>
      </DropDown>
    </Box>
  )
}

export default LanguageSelect
