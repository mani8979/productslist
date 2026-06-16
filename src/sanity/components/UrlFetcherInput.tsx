import { useCallback, useState } from 'react';
import { StringInputProps, useClient, useFormValue } from 'sanity';
import { Box, Button, Flex, Text, TextInput, Spinner, Stack } from '@sanity/ui';

export function UrlFetcherInput(props: StringInputProps) {
  const { elementProps, onChange, value } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = useClient({ apiVersion: '2024-03-21' });
  
  // Get the current document ID to patch sibling fields
  const documentId = useFormValue(['_id']) as string | undefined;

  const handleFetch = useCallback(async () => {
    if (!value) {
      setError('Please enter a URL first');
      return;
    }

    if (!documentId) {
      setError('Please save the document once (as a draft) before fetching details.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/scrape?url=${encodeURIComponent(value)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // 1. Directly patch the document with the new title and image URL
      // Note: If working on a draft, the ID is prefixed with 'drafts.'
      const targetId = documentId.startsWith('drafts.') ? documentId : `drafts.${documentId}`;
      
      const patch = client.patch(targetId);
      if (data.title) {
        patch.set({ title: data.title });
      }
      if (data.imageUrl) {
        patch.set({ imageUrl: data.imageUrl });
      }
      
      await patch.commit();
      alert(`Successfully fetched and applied:\nTitle: ${data.title}`);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [value, client, documentId]);

  return (
    <Stack space={3}>
      <Flex gap={2} align="center">
        <Box flex={1}>
          <TextInput {...elementProps} />
        </Box>
        <Button 
          onClick={handleFetch} 
          disabled={loading || !value}
          mode="ghost"
          text={loading ? 'Fetching...' : 'Fetch Details'}
          icon={loading ? Spinner : undefined}
        />
      </Flex>
      {error && (
        <Text size={1} style={{ color: 'red' }}>
          {error}
        </Text>
      )}
    </Stack>
  );
}
