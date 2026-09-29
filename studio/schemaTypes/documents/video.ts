import {defineField, defineType} from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Short display title, e.g. "charge your spirit" — lowercase, matches the site\'s heading voice.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accent',
      type: 'string',
      description: 'The one word/phrase from the title styled as the italic accent, e.g. "spirit".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'credit',
      type: 'string',
      description: 'e.g. "with Pastor Oluwatise Oyetunde." — shown under the title.',
    }),
    defineField({
      name: 'channel',
      type: 'string',
      description: 'Which YouTube channel this video was published under — the watch page splits the archive by this.',
      options: {
        list: [
          {title: 'OneVoice', value: 'onevoice'},
          {title: 'Lift Our Voices (LOV)', value: 'lov'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      type: 'url',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      type: 'string',
      description: 'Optional, e.g. "30 min" — shown next to the watch button when set.',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      description: 'Real publish/stream date — the homepage slideshow shows the 5 most recent by this date.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'credit', media: 'thumbnail'},
  },
  orderings: [
    {
      name: 'publishedAtDesc',
      title: 'Most recent first',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
