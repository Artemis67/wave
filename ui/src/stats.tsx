// Copyright 2020 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { FontIcon } from '@fluentui/react'
import React from 'react'
import { stylesheet } from 'typestyle'
import { B, Dict, S } from './qd'
import { clas, getTheme, padding } from './theme'

/** Create a set of stats laid out horizontally. */
export interface Stats {
  /** The individual stats to be displayed. */
  items: Stat[]
  /** Specifies how to lay out the individual stats. Defaults to 'start'. */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around'
  /** Whether to display the stats with a contrasting background. */
  inset?: B
}

/** Create a stat (a label-value pair) for displaying a metric. */
export interface Stat {
  /** The label for the metric. */
  label: S
  /** The value of the metric. */
  value?: S
  /** The caption displayed below the primary value. */
  caption?: S
  /** An optional icon, displayed next to the label. */
  icon?: S
  /** The color of the icon. */
  icon_color?: S
}

const
  theme = getTheme(),
  css = stylesheet({
    stats: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    inset: {
      background: theme.colors.page,
      padding: padding(10, 15),
    },
    stat: {
      display: 'flex',
      alignItems: 'center'
    },
    lhs: {
      width: '45px',
      marginRight: '0.5em',
    },
    icon: {
      fontSize: '45px',
    },
    statLabel: {
      ...theme.font.s12,
      ...theme.font.w5,
    },
    statValue: {
      ...theme.font.s24,
      ...theme.font.w3,
    },
    statCaption: {
      ...theme.font.s13,
      color: theme.colors.text5,
    }
  }),
  justifications: Dict<S> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
  },
  statMargin = '2em'


export const
  XStats = ({ model: m }: { model: Stats }) => {
    const
      statStyle: React.CSSProperties = m.justify
        ? m.justify === 'start'
          ? { marginRight: statMargin }
          : m.justify === 'end'
            ? { marginLeft: statMargin }
            : {}
        : { marginRight: statMargin },
      justification = justifications[m.justify ?? ''],
      stats = m.items.map(({ label, value, caption, icon, icon_color }, i) => (
        <div key={`${i}:${label}`} className={css.stat} style={statStyle}>
          { icon && (
            <div className={css.lhs} style={icon_color ? { color: theme.color(icon_color) } : undefined}>
              <FontIcon className={css.icon} iconName={icon} />
            </div>
          )}
          <div>
            <div className={css.statLabel}>{label}</div>
            {value && <div className={css.statValue}>{value}</div>}
            {caption && <div className={css.statCaption}>{caption}</div>}
          </div>
        </div>
      ))

    return (
      <div className={clas(css.stats, m.inset ? css.inset : '')} style={{ justifyContent: justification }}>{stats}</div>
    )
  }