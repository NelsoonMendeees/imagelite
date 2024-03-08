'use client'

import { Template, ImageCard, Button, InputText, useNotification, AuthenticatedPage } from "@/components";
import { useState } from "react";
import { useImageService } from "@/resources";
import { Image } from "@/resources/image/image.resource";
import Link from "next/link";


export default function GaleriaPage() {
    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([])
    const [query, setQuery] = useState<string>('')
    const [extension, setExtension] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const notification = useNotification()

    async function searchImages() {
        setLoading(true)
        const result = await useService.search(query, extension)
        setImages(result)
        setLoading(false)

        if (!result.length) {
            notification.notify('No results found!', 'warning')
        }
    }

    function renderImageCard(image: Image) {
        return (
            <ImageCard nome={image.name} src={image.url} tamanho={image.size} dataUpload={image.uploadDate} extension={image.extension} key={image.url} />
        )
    }

    function renderImageCards() {
        return images.map(renderImageCard)
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className="flex flex-col items-center justify-center my-5">
                    <div className="flex space-x-4">

                        <InputText placeholder="Type name or tag" onChange={event => setQuery(event.target.value)} dataId="inputSearchImage" />

                        <select onChange={event => setExtension(event.target.value)} data-cy="selectFormat" className="border px-4 py-2 rounded-lg text-gray-900">
                            <option>All Formats</option>
                            <option value="PNG">PNG</option>
                            <option value="JPEG">JPEG</option>
                            <option value="GIF">GIF</option>
                        </select>

                        <Button style="bg-blue-500 hover:bg-blue-300" label="Search" onClick={searchImages} dataId="btnSearch" />

                        <Link href="/formulario">
                            <Button style="bg-yellow-500 hover:bg-yellow-300" label="Add New" dataId="btnAddNew" />
                        </Link>
                    </div>
                </section>

                <section className="grid gap-8 grid-cols-5">
                    {renderImageCards()}
                </section>
            </Template>
        </AuthenticatedPage>
    );
}
