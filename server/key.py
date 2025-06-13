import sys
import json
from keybert import KeyBERT

kw_model = KeyBERT()

input_data = json.loads(sys.argv[1])

text = input_data['text']

keywords = kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 2), stop_words='english')

output_data = {
    'keywords': keywords
}

print(json.dumps(output_data))
