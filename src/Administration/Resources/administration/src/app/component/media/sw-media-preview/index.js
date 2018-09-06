import { Component } from 'src/core/shopware';
import template from './sw-media-preview.html.twig';
import './sw-media-preview.less';

Component.register('sw-media-preview', {
    template,

    props: {
        item: {
            required: true,
            type: Object

        },

        playable: {
            type: Boolean,
            required: false,
            default: false
        },

        autoplay: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    computed: {
        checkForFileTypeImage() {
            const filePath = this.item.mimeType;
            const regEx = /^image\/+/;

            return (regEx.test(filePath));
        },

        checkForFileTypeVideo() {
            const filePath = this.item.mimeType;
            const regEx = /^video\/+/;

            return (regEx.test(filePath) && this.isVideoPlayable());
        },

        checkForFileTypeAudio() {
            const filePath = this.item.mimeType;
            const regEx = /^audio\/+/;

            return (regEx.test(filePath) && this.isAudioPlayable());
        },

        checkForInMemoryFile() {
            return this.item.mimeType === 'in-memory-file';
        },

        placeholderIcon() {
            let regEx = /^video\/+/;
            if (regEx.test(this.item.mimeType)) {
                // show movie placeholder image if video format is not playable
                return 'file-thumbnail-mov';
            }

            regEx = /^audio\/+/;
            if (regEx.test(this.item.mimeType)) {
                // show movie placeholder image if video format is not playable
                return 'file-thumbnail-mp3';
            }

            const fileExtensions = {
                'application/pdf': 'file-thumbnail-pdf',
                'application/msword': 'file-thumbnail-doc',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'file-thumbnail-doc',
                'application/vnd.ms-excel': 'file-thumbnail-xls',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'file-thumbnail-xls',
                'application/svg': 'file-thumbnail-svg',
                'application/vnd.ms-powerpoint': 'file-thumbnail-ppt',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'file-thumbnail-ppt',
                'application/svg+xml': 'file-thumbnail-svg'
            };

            return fileExtensions[this.item.mimeType] || 'file-thumbnail-normal';
        },

        imageURLFromItem() {
            return `${this.item.url}?${Date.now()}`;
        }
    },

    methods: {
        isVideoPlayable() {
            return [
                'video/mp4',
                'video/ogg',
                'video/webm'
            ].includes(this.item.mimeType);
        },

        isAudioPlayable() {
            return [
                'audio/mp3',
                'audio/mpeg',
                'audio/ogg',
                'audio/wav'
            ].includes(this.item.mimeType);
        }
    }
});
