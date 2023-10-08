import fs from 'fs-extra';
import { Document, VectorStoreIndex } from 'llamaindex';

import { Injectable } from '@nestjs/common';

@Injectable()
export class LlamaIndexService {
    async getData() {
        const essay = await fs.readFile('../../../data/mexican_animal.txt');
        // Create Document object with essay
        const document = new Document({ text: essay });
    
        // Split text and create embeddings. Store them in a VectorStoreIndex
        const index = await VectorStoreIndex.fromDocuments([document]);
    
        // Query the index
        const queryEngine = index.asQueryEngine();
        const response = await queryEngine.query(
          `What are the endangered animals mentioned in the article?  
          
          Answer me in the following json structure: 
          {
            "naturalName": string,
            "scientificName": string,
            "habitat": string,
            "state": string,
            "extraInformation": string
          }`,
        );
    
        return response.toString();
      }
}
