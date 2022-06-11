/** @jsxImportSource jsx-slack */
import {Blocks, Section} from 'jsx-slack'

export const sampleBlock = ({name}: { name: string }) => (
    <Blocks>
        <Section>
            Hello, <b>{name}</b>!
        </Section>
    </Blocks>
)