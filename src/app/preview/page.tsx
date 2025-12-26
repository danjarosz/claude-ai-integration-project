"use client";

import {
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Checkbox,
  Label,
  Toggle,
  Heading,
  Text,
  Code,
  Kbd,
  Badge,
  Card,
  CardHeader,
  CardBody,
  HStack,
  VStack,
  Divider,
  Alert,
  Spinner,
  Progress,
  Avatar,
  SkeletonText,
  ProductCard,
} from "@/ui";

export default function PreviewPage() {
  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <Heading level={1} className="mb-2">
        UI Component Library
      </Heading>
      <Text color="muted" className="mb-8">
        A comprehensive UI library built with TailwindCSS. All components
        support both automatic and explicit dark mode.
      </Text>

      {/* Buttons */}
      <section className="mb-12">
        <Heading level={2} className="mb-4">
          Buttons
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card theme="light">
            <CardHeader>
              <Text weight="semibold">Light Mode</Text>
            </CardHeader>
            <CardBody>
              <HStack gap={3} wrap>
                <Button variant="default">Default</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button loading>Loading</Button>
              </HStack>
            </CardBody>
          </Card>

          <Card theme="dark">
            <CardHeader>
              <Text weight="semibold">Dark Mode</Text>
            </CardHeader>
            <CardBody>
              <HStack gap={3} wrap>
                <Button variant="default" theme="dark">Default</Button>
                <Button variant="primary" theme="dark">Primary</Button>
                <Button variant="destructive" theme="dark">Destructive</Button>
                <Button variant="outline" theme="dark">Outline</Button>
                <Button variant="ghost" theme="dark">Ghost</Button>
                <Button loading theme="dark">Loading</Button>
              </HStack>
            </CardBody>
          </Card>
        </div>
      </section>

      <Divider spacing="lg" />

      {/* Form Inputs */}
      <section className="mb-12">
        <Heading level={2} className="mb-4">
          Form Inputs
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card theme="light">
            <CardHeader>
              <Text weight="semibold">Light Mode</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={4}>
                <div className="w-full">
                  <Label htmlFor="input-light">Text Input</Label>
                  <Input id="input-light" placeholder="Enter text..." />
                </div>
                <div className="w-full">
                  <Label htmlFor="textarea-light">Textarea</Label>
                  <Textarea id="textarea-light" placeholder="Enter message..." />
                </div>
                <div className="w-full">
                  <Label htmlFor="select-light">Select</Label>
                  <Select id="select-light" placeholder="Choose option">
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                    <Option value="3">Option 3</Option>
                  </Select>
                </div>
                <Checkbox label="I agree to terms" />
              </VStack>
            </CardBody>
          </Card>

          <Card theme="dark">
            <CardHeader>
              <Text weight="semibold">Dark Mode</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={4}>
                <div className="w-full">
                  <Label htmlFor="input-dark" theme="dark">Text Input</Label>
                  <Input id="input-dark" placeholder="Enter text..." theme="dark" />
                </div>
                <div className="w-full">
                  <Label htmlFor="textarea-dark" theme="dark">Textarea</Label>
                  <Textarea id="textarea-dark" placeholder="Enter message..." theme="dark" />
                </div>
                <div className="w-full">
                  <Label htmlFor="select-dark" theme="dark">Select</Label>
                  <Select id="select-dark" placeholder="Choose option" theme="dark">
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                    <Option value="3">Option 3</Option>
                  </Select>
                </div>
                <Checkbox label="I agree to terms" theme="dark" />
              </VStack>
            </CardBody>
          </Card>
        </div>
      </section>

      <Divider spacing="lg" />

      {/* Toggle Switches */}
      <section className="mb-12">
        <Heading level={2} className="mb-4">
          Toggle Switches
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card theme="light">
            <CardHeader>
              <Text weight="semibold">Light Mode - Variants</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={4} align="start">
                <Toggle variant="primary" label="Primary" defaultChecked />
                <Toggle variant="secondary" label="Secondary" defaultChecked />
                <Toggle variant="success" label="Success" defaultChecked />
                <Toggle variant="warning" label="Warning" defaultChecked />
                <Toggle variant="danger" label="Danger" defaultChecked />
              </VStack>
            </CardBody>
          </Card>

          <Card theme="dark">
            <CardHeader>
              <Text weight="semibold">Dark Mode - Variants</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={4} align="start">
                <Toggle variant="primary" label="Primary" theme="dark" defaultChecked />
                <Toggle variant="secondary" label="Secondary" theme="dark" defaultChecked />
                <Toggle variant="success" label="Success" theme="dark" defaultChecked />
                <Toggle variant="warning" label="Warning" theme="dark" defaultChecked />
                <Toggle variant="danger" label="Danger" theme="dark" defaultChecked />
              </VStack>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card theme="light">
            <CardHeader>
              <Text weight="semibold">Sizes & States</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={4} align="start">
                <HStack gap={4} align="center">
                  <Toggle size="sm" label="Small" />
                  <Toggle size="md" label="Medium" />
                  <Toggle size="lg" label="Large" />
                </HStack>
                <Toggle disabled label="Disabled" />
                <Toggle
                  label="With Description"
                  description="This is a helpful description for the toggle option."
                />
              </VStack>
            </CardBody>
          </Card>

          <Card theme="dark">
            <CardHeader>
              <Text weight="semibold">Sizes & States</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={4} align="start">
                <HStack gap={4} align="center">
                  <Toggle size="sm" label="Small" theme="dark" />
                  <Toggle size="md" label="Medium" theme="dark" />
                  <Toggle size="lg" label="Large" theme="dark" />
                </HStack>
                <Toggle disabled label="Disabled" theme="dark" />
                <Toggle
                  label="With Description"
                  description="This is a helpful description for the toggle option."
                  theme="dark"
                />
              </VStack>
            </CardBody>
          </Card>
        </div>
      </section>

      <Divider spacing="lg" />

      {/* Typography */}
      <section className="mb-12">
        <Heading level={2} className="mb-4">
          Typography
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card theme="light">
            <CardHeader>
              <Text weight="semibold">Light Mode</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={3} align="start">
                <Heading level={3}>Heading 3</Heading>
                <Text>Regular paragraph text with default styling.</Text>
                <Text color="muted">Muted text for secondary content.</Text>
                <HStack gap={2}>
                  <Code>inline code</Code>
                  <Kbd>Ctrl</Kbd>
                  <Kbd>C</Kbd>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          <Card theme="dark">
            <CardHeader>
              <Text weight="semibold">Dark Mode</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={3} align="start">
                <Heading level={3} theme="dark">Heading 3</Heading>
                <Text theme="dark">Regular paragraph text with default styling.</Text>
                <Text color="muted" theme="dark">Muted text for secondary content.</Text>
                <HStack gap={2}>
                  <Code theme="dark">inline code</Code>
                  <Kbd theme="dark">Ctrl</Kbd>
                  <Kbd theme="dark">C</Kbd>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </div>
      </section>

      <Divider spacing="lg" />

      {/* Badges */}
      <section className="mb-12">
        <Heading level={2} className="mb-4">
          Badges
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card theme="light">
            <CardHeader>
              <Text weight="semibold">Light Mode</Text>
            </CardHeader>
            <CardBody>
              <HStack gap={2} wrap>
                <Badge color="primary">Primary</Badge>
                <Badge color="success">Success</Badge>
                <Badge color="warning">Warning</Badge>
                <Badge color="error">Error</Badge>
                <Badge color="neutral" variant="outline">Outline</Badge>
                <Badge color="primary" rounded>Rounded</Badge>
              </HStack>
            </CardBody>
          </Card>

          <Card theme="dark">
            <CardHeader>
              <Text weight="semibold">Dark Mode</Text>
            </CardHeader>
            <CardBody>
              <HStack gap={2} wrap>
                <Badge color="primary" theme="dark">Primary</Badge>
                <Badge color="success" theme="dark">Success</Badge>
                <Badge color="warning" theme="dark">Warning</Badge>
                <Badge color="error" theme="dark">Error</Badge>
                <Badge color="neutral" variant="outline" theme="dark">Outline</Badge>
                <Badge color="primary" rounded theme="dark">Rounded</Badge>
              </HStack>
            </CardBody>
          </Card>
        </div>
      </section>

      <Divider spacing="lg" />

      {/* Alerts */}
      <section className="mb-12">
        <Heading level={2} className="mb-4">
          Alerts
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card theme="light" padding="sm">
            <CardHeader>
              <Text weight="semibold">Light Mode</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={3}>
                <Alert variant="info" title="Info">This is an informational message.</Alert>
                <Alert variant="success" title="Success">Operation completed successfully.</Alert>
                <Alert variant="warning" title="Warning">Please review before continuing.</Alert>
                <Alert variant="error" title="Error">Something went wrong.</Alert>
              </VStack>
            </CardBody>
          </Card>

          <Card theme="dark" padding="sm">
            <CardHeader>
              <Text weight="semibold">Dark Mode</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={3}>
                <Alert variant="info" title="Info" theme="dark">This is an informational message.</Alert>
                <Alert variant="success" title="Success" theme="dark">Operation completed successfully.</Alert>
                <Alert variant="warning" title="Warning" theme="dark">Please review before continuing.</Alert>
                <Alert variant="error" title="Error" theme="dark">Something went wrong.</Alert>
              </VStack>
            </CardBody>
          </Card>
        </div>
      </section>

      <Divider spacing="lg" />

      {/* Feedback */}
      <section className="mb-12">
        <Heading level={2} className="mb-4">
          Feedback Components
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card theme="light">
            <CardHeader>
              <Text weight="semibold">Light Mode</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={4}>
                <HStack gap={4}>
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" color="success" />
                </HStack>
                <div className="w-full">
                  <Text size="sm" className="mb-1">Progress: 65%</Text>
                  <Progress value={65} />
                </div>
                <HStack gap={2}>
                  <Avatar fallback="JD" size="sm" />
                  <Avatar fallback="AB" size="md" />
                  <Avatar fallback="XY" size="lg" />
                </HStack>
                <div className="w-full">
                  <SkeletonText lines={2} />
                </div>
              </VStack>
            </CardBody>
          </Card>

          <Card theme="dark">
            <CardHeader>
              <Text weight="semibold">Dark Mode</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={4}>
                <HStack gap={4}>
                  <Spinner size="sm" theme="dark" />
                  <Spinner size="md" theme="dark" />
                  <Spinner size="lg" color="success" theme="dark" />
                </HStack>
                <div className="w-full">
                  <Text size="sm" className="mb-1" theme="dark">Progress: 65%</Text>
                  <Progress value={65} theme="dark" />
                </div>
                <HStack gap={2}>
                  <Avatar fallback="JD" size="sm" theme="dark" />
                  <Avatar fallback="AB" size="md" theme="dark" />
                  <Avatar fallback="XY" size="lg" theme="dark" />
                </HStack>
                <div className="w-full">
                  <SkeletonText lines={2} theme="dark" />
                </div>
              </VStack>
            </CardBody>
          </Card>
        </div>
      </section>

      <Divider spacing="lg" />

      {/* Button Sizes */}
      <section className="mb-12">
        <Heading level={2} className="mb-4">
          Button Sizes
        </Heading>
        <Card>
          <CardBody>
            <HStack gap={3} align="end" wrap>
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </HStack>
          </CardBody>
        </Card>
      </section>

      <Divider spacing="lg" />

      {/* Product Cards */}
      <section className="mb-12">
        <Heading level={2} className="mb-4">
          Product Cards
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card theme="light" padding="lg">
            <CardHeader>
              <Text weight="semibold">Light Mode - Variants</Text>
            </CardHeader>
            <CardBody>
              <HStack gap={4} wrap align="start">
                <ProductCard
                  name="Primary Product"
                  price={29.99}
                  href="/products/primary"
                  variant="primary"
                  size="sm"
                />
                <ProductCard
                  name="Secondary Product"
                  price={49.99}
                  href="/products/secondary"
                  variant="secondary"
                  size="sm"
                />
                <ProductCard
                  name="Success Product"
                  price={19.99}
                  href="/products/success"
                  variant="success"
                  size="sm"
                />
                <ProductCard
                  name="Danger Product"
                  price={99.99}
                  href="/products/danger"
                  variant="danger"
                  size="sm"
                />
                <ProductCard
                  name="Warning Product"
                  price={39.99}
                  href="/products/warning"
                  variant="warning"
                  size="sm"
                />
              </HStack>
            </CardBody>
          </Card>

          <Card theme="dark" padding="lg">
            <CardHeader>
              <Text weight="semibold">Dark Mode - Variants</Text>
            </CardHeader>
            <CardBody>
              <HStack gap={4} wrap align="start">
                <ProductCard
                  name="Primary Product"
                  price={29.99}
                  href="/products/primary"
                  variant="primary"
                  size="sm"
                  theme="dark"
                />
                <ProductCard
                  name="Secondary Product"
                  price={49.99}
                  href="/products/secondary"
                  variant="secondary"
                  size="sm"
                  theme="dark"
                />
                <ProductCard
                  name="Success Product"
                  price={19.99}
                  href="/products/success"
                  variant="success"
                  size="sm"
                  theme="dark"
                />
                <ProductCard
                  name="Danger Product"
                  price={99.99}
                  href="/products/danger"
                  variant="danger"
                  size="sm"
                  theme="dark"
                />
                <ProductCard
                  name="Warning Product"
                  price={39.99}
                  href="/products/warning"
                  variant="warning"
                  size="sm"
                  theme="dark"
                />
              </HStack>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card theme="light" padding="lg">
            <CardHeader>
              <Text weight="semibold">Sizes & States</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={4} align="start">
                <HStack gap={4} wrap align="start">
                  <ProductCard
                    name="Small"
                    price={9.99}
                    href="/products/small"
                    size="sm"
                  />
                  <ProductCard
                    name="Medium"
                    price={29.99}
                    href="/products/medium"
                    size="md"
                  />
                  <ProductCard
                    name="Large"
                    price={49.99}
                    href="/products/large"
                    size="lg"
                  />
                </HStack>
                <ProductCard
                  name="Disabled Product"
                  price={19.99}
                  href="/products/disabled"
                  disabled
                  size="sm"
                />
              </VStack>
            </CardBody>
          </Card>

          <Card theme="dark" padding="lg">
            <CardHeader>
              <Text weight="semibold">Sizes & States</Text>
            </CardHeader>
            <CardBody>
              <VStack gap={4} align="start">
                <HStack gap={4} wrap align="start">
                  <ProductCard
                    name="Small"
                    price={9.99}
                    href="/products/small"
                    size="sm"
                    theme="dark"
                  />
                  <ProductCard
                    name="Medium"
                    price={29.99}
                    href="/products/medium"
                    size="md"
                    theme="dark"
                  />
                  <ProductCard
                    name="Large"
                    price={49.99}
                    href="/products/large"
                    size="lg"
                    theme="dark"
                  />
                </HStack>
                <ProductCard
                  name="Disabled Product"
                  price={19.99}
                  href="/products/disabled"
                  disabled
                  size="sm"
                  theme="dark"
                />
              </VStack>
            </CardBody>
          </Card>
        </div>
      </section>
    </main>
  );
}
